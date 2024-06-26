import * as S from "./style";
import { post } from "../../utils/api";
import usePopup from "../usePopup";
import Typography from "../../components/common/Typography";
import useAlert from "../useAlert";
import { FormEvent } from "react";

interface Options {
  type: "short-form" | "article" | "video" | "report" | "travelog";
  postId?: number | null;
  commentId?: number | null;
  setIsReported?: React.Dispatch<React.SetStateAction<boolean>>;
}

function useReportPopup({
  type,
  postId = null,
  commentId = null,
  setIsReported,
}: Options) {
  const { Alert, alertOpen } = useAlert({
    Content: (
      <Typography.Body size="lg" color="white">
        신고가 접수되었습니다.
      </Typography.Body>
    ),
  });
  const { Popup, popupOpen, popupClose } = usePopup();
  const reasons = [
    "욕설 / 비방",
    "차별 / 혐오",
    "저작권 침해",
    "음란 / 유해",
    "개인 정보 유포 / 거래",
    "상업적 스팸",
    "기타",
  ];

  const sendReport = async (reason: string, opinion: string | null = null) => {
    try {
      const { data } = await post<{
        message: "Post report success" | "Comment report success";
      }>(
        `/community/${type}/report`,
        {
          reason: reason,
          opinion: opinion,
        },
        {
          params: {
            post_id: postId,
            comment_id: commentId,
          },
        }
      );

      if (
        data.message === "Comment report success" ||
        data.message === "Post report success"
      ) {
        setIsReported && setIsReported(true);
        alertOpen();
        popupClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target.reportReason) {
      sendReport(e.target.reportReason.value);
    }
  };

  const ReportPopup = () => (
    <>
      <Alert />
      <Popup padding="0">
        <S.ReportForm onSubmit={onSubmit}>
          <Typography.Title size="lg">신고하기</Typography.Title>
          <S.ReasonList>
            {reasons.map((item, index) => (
              <S.ResonItem key={`reportReason-${index}`}>
                <S.RadioInput
                  type="radio"
                  id={`reason-${index}`}
                  name="reportReason"
                  defaultChecked={index === 0}
                  value={item}
                />
                <Typography.Body size="lg">
                  <S.RadioLabel htmlFor={`reason-${index}`}>
                    {item}
                  </S.RadioLabel>
                </Typography.Body>
              </S.ResonItem>
            ))}
          </S.ReasonList>
          <S.ControlBox>
            <S.Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                popupClose();
              }}
            >
              취소
            </S.Button>
            <S.Button type="submit" primary={true}>
              신고하기
            </S.Button>
          </S.ControlBox>
        </S.ReportForm>
      </Popup>
    </>
  );
  return {
    ReportPopup,
    reportPopupOpen: popupOpen,
    reportPopupClose: popupClose,
  };
}

export default useReportPopup;
