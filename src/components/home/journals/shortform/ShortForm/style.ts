import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100%;
  scroll-snap-align: start;
  margin-bottom: 10px;
`;

export const YoutubeContainer = styled.div<{ isCaptionOpened: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100dvh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }

  overflow: hidden;
  border-radius: 10px;

  &::after {
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    content: "";
    display: block;
    width: 100%;
    height: auto;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0.6) 90%,
      rgba(0, 0, 0, 0.9) 100%
    );
    transition: all 0.3s ease-in-out;

    ${({ isCaptionOpened }) =>
      isCaptionOpened &&
      css`
        top: 0;
        bottom: 0;
        background: none;
        background-color: rgba(0, 0, 0, 0.4);
        height: auto;
      `}
  }
`;

export const YoutubeFallback = styled.div`
  width: 100%;
  height: inherit;
  background-color: ${({ theme }) => theme.black};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const YoutubeIframe = styled.iframe`
  width: 100%;
  height: inherit;
`;

export const InfoBox = styled.div`
  padding: 17px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > p:first-child {
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      display: flex;
      align-items: center;
      gap: 6px;

      word-break: keep-all;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      color: ${({ theme }) => theme.white};
    }

    button {
      font-size: 9px;
      padding: 0 10px 0 6px;
      line-height: 20px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  & > p:nth-child(2) {
    padding-left: 2px;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    word-break: keep-all;
    color: ${({ theme }) => theme.white};
  }
`;

export const ContentBox = styled.div<{ isOpened: boolean }>`
  width: 100%;
  max-height: 30px;
  /* display: -webkit-box; */
  /* text-overflow: clip; */
  display: flex;
  /* display: grid; */
  /* grid-template-columns: 1fr fit-Content; */
  overflow: hidden;
  /* -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; */

  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;

  ${({ isOpened }) =>
    isOpened
      ? css`
          display: block;
          max-height: 240px;
          overflow-y: auto;
          text-overflow: clip;
          /* background-color: #00000050; */
        `
      : css`
          &::after {
            content: "...";
            color: ${({ theme }) => theme.white};
            margin-top: 2px;
            border-radius: 5px;
            padding: 2px 3px;
          }
        `};

  &:hover {
    &::after {
      background-color: #00000050;
    }
  }
  p {
    padding: ${({ isOpened }) => (isOpened ? "5px" : 0)};
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.25px;
    word-break: ${({ isOpened }) => (isOpened ? "keep-all" : "break-all")};
    overflow-wrap: anywhere;
  }
`;

export const BottomInfoContainer = styled.div`
  display: flex;
  gap: 20px;

  font-size: 13px;
  color: ${({ theme }) => theme.white};

  span {
    display: flex;
    align-items: center;
    line-height: 23px;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    path {
      fill: ${({ theme }) => theme.white};
    }
  }
`;

export const ProgileImageBox = styled.div`
  & > img,
  & > svg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  & > svg path {
    fill: ${({ theme }) => theme.white};
  }
`;

export const FollowButton = styled.button`
  border: 0;
  background-color: ${({ theme }) => theme.main};
  color: white;
`;

export const ControlBox = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 17px 20px;
`;

export const IconButton = styled.button`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.white};
  border: 0;
  background: transparent;
  cursor: pointer;

  svg {
    margin-bottom: 6px;
    width: 30px;
    height: 30px;
  }

  &:not(:first-child) {
    margin-top: 20px;
    svg path {
      fill: ${({ theme }) => theme.white};
    }
  }

  /* &:first-child svg {
    path {
      stroke: ${({ theme }) => theme.gray02};
    }
  } */
`;

export const UrlLabel = styled.label`
  display: block;
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const UrlInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 15px;
  border: 0;
  font-size: 16px;

  cursor: pointer;
  background-color: ${({ theme }) => theme.gray05};

  &:hover {
    background-color: ${({ theme }) => theme.gray04};
  }
`;

export const LoadingDiv = styled.div``;
