import styled from 'styled-components';

export const NavList = styled.ol`
  width: 100%;
  max-width: 500px;
  background-color: white;

  padding-top: 8px;
  padding-bottom: 15px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const ListItem = styled.li<{ isActive?: boolean }>`
  a {
    padding-left: 10px;
    padding-right: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    color: ${({ isActive, theme }) => (isActive ? theme.main : theme.gray02)};
    transition: all ease-in-out 0.3s;

    span {
      font-size: 10px;
      font-weight: 600;
      line-height: 12px;
      margin-top: 2px;
    }
    svg {
      width: 24px;
      height: 24px;

      path {
        transition: all ease-in-out 0.3s;
        fill: ${({ isActive, theme }) => (isActive ? theme.main : theme.gray02)};
      }
    }

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.main};
        path {
          fill: ${({ theme }) => theme.main};
        }
      }
    }
  }
`;
