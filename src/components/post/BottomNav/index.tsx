import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { post } from '@_utils/api';
import usePopup from '../../../hooks/usePopup';
import useAlert from '../../../hooks/useAlert';
import Typography from '../../common/Typography';
import useScrapModal from '../../video/useScrapModal';

import ClapIcon from '../../../assets/icons/clap.svg?react';
import ClapMainIcon from '../../../assets/icons/clap_blue.svg?react';
import CommentIcon from '../../../assets/icons/comment.svg?react';
import BookMarkIcon from '../../../assets/icons/bookmark.svg?react';
import ShareIcon from '../../../assets/icons/share.svg?react';

import isLogin from '@_utils/isLogin';

import * as S from './style';
import { useSetRecoilState } from 'recoil';
import { popupValue } from '@_recoil/common/PopupValue';

interface Props {
  postId: number;
  isClap: boolean;
  isBookmarked: boolean;
  claps: number;
  comment: number;
  onCommentClick: () => void;
  bookmark: number;
  onShareClick: () => void;
  title?: string;
}

function BottomNav({
  postId,
  isClap,
  claps,
  comment,
  onCommentClick,
  bookmark,
  onShareClick,
  title,
  isBookmarked,
}: Props) {
  const navigate = useNavigate();
  const { Popup, popupOpen, popupClose } = usePopup();
  const [isUserScraped, setIsUserScraped] = useState<boolean>(isBookmarked);
  const [isUserClap, setIsUserClap] = useState<boolean>(isClap);
  const [isUserClpas, setIsUserClpas] = useState<number>(claps);
  const setPopupUI = useSetRecoilState(popupValue);

  const { Alert, alertOpen } = useAlert({
    Content: (
      <Typography.Body size="lg" color="white">
        로그인이 필요한 서비스에요.
      </Typography.Body>
    ),
    RightContent: (
      <Typography.Body size="lg" color="white">
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인 하러가기
        </span>
      </Typography.Body>
    ),
  });

  const { ScrapModal, scrapModalOpen, scrapModalClose } = useScrapModal({
    id: Number(postId),
    type: 'article',
    setIsScraped: () => {
      setIsUserScraped((prev) => !prev);
    },
  });

  function countScraps() {
    if (isBookmarked) {
      if (isUserScraped) {
        return bookmark;
      }
      return bookmark - 1;
    }
    if (isUserScraped) {
      return bookmark + 1;
    }
    return bookmark;
  }
  return (
    <>
      <Alert />
      <ScrapModal />
      <S.Navigation>
        <S.NavigationItem
          onClick={() => {
            if (isLogin()) {
              post<{
                message: 'CREATE SUCCESS' | 'DELETE SUCCESS';
              }>('/clap/community', {
                community: 'article',
                postId,
              }).then((response) => {
                if (response.data.message == 'CREATE SUCCESS') {
                  setIsUserClap(true);
                  setIsUserClpas((prev) => prev + 1);
                } else {
                  setIsUserClap(false);
                  setIsUserClpas((prev) => prev - 1);
                }
              });
            } else {
              alertOpen();
            }
          }}
        >
          {isUserClap ? <ClapMainIcon /> : <ClapIcon />}
          <span>{isUserClpas}</span>
        </S.NavigationItem>
        <S.NavigationItem
          onClick={() => {
            if (isLogin()) {
              onCommentClick();
            } else {
              alertOpen();
            }
          }}
        >
          <CommentIcon />
          <span>{comment}</span>
        </S.NavigationItem>
        <S.NavigationItem
          isBookmarked={isUserScraped}
          onClick={() => {
            if (!isUserScraped && localStorage.getItem('access_token')) {
              post<{ message: 'Create Success' | 'Delete Success' }>('/folder/scrap/community', {
                community: 'article',
                postId,
              }).then(() => {
                setIsUserScraped(true);
              });
            }
            if (isLogin()) {
              scrapModalOpen();
            } else {
              alertOpen();
            }
          }}
        >
          <BookMarkIcon />
          <span>{countScraps()}</span>
        </S.NavigationItem>
        <S.NavigationItem
          onClick={() => {
            setPopupUI({
              Custom: (
                <>
                  <S.UrlLabel htmlFor="urlCopy">아래 링크를 복사해 공유해보세요!</S.UrlLabel>
                  <S.UrlInput
                    type="url"
                    name="현재 링크 복사"
                    id="urlCopy"
                    value={window.location.href}
                    onClick={() => {
                      navigator.clipboard.writeText(`${title}\n${window.location.href}`);
                      popupClose();
                      if (onShareClick) onShareClick();
                    }}
                  />
                </>
              ),
            });
            popupOpen();
          }}
        >
          <ShareIcon />
        </S.NavigationItem>
      </S.Navigation>
    </>
  );
}

export default BottomNav;
