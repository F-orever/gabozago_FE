import Heading from "../common/Heading";
import * as S from "../../styles/schedule/Schedule.style";
import BookMarkBtn from "./BookMarkBtn";

interface Props {
    imgURL: string;
    heading: string;
    content: string;
    currentBookMarked: boolean;
}
function ScheduleCard({ imgURL, heading, content, currentBookMarked }: Props) {
    function onBookMarkClickHandler() {}

    return (
        <S.Container>
            <S.ImgWrapper>
                <BookMarkBtn
                    currentBookMarked={currentBookMarked}
                    onClick={onBookMarkClickHandler}
                />
                <img src={imgURL} alt={heading}></img>
            </S.ImgWrapper>
            <Heading size="xs">{heading}</Heading>
            <S.Content>{content}</S.Content>
        </S.Container>
    );
}

export default ScheduleCard;