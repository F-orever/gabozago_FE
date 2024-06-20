import styled, { css } from 'styled-components'

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 18px;
`

export const HeaderText = styled.span`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0.2px;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: white;
  margin-top: 50px;
`

export const Button = styled.button`
  position: absolute;
  bottom: 45px;

  width: calc(100% - 40px);
  padding: 17px 0px;

  background-color: ${({ theme }) => theme.main};

  cursor: pointer;
  border: none;
  border-radius: 30px;
  box-sizing: border-box;

  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;

  &:disabled {
    background-color: ${({ theme }) => theme.gray03};
    color: ${({ theme }) => theme.white};
  }
`

export const BrandIcon = styled.div<{
  type: 'kakao' | 'google' | 'naver' | 'apple'
}>`
  width: 16px;
  height: 16px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
    path {
      width: 16px;
      height: 16px;
    }
  }

  ${({ type }) => type === 'naver' && 'svg{width:8px; height:8px;}'}

  ${({ type }) => {
    switch (type) {
      case 'kakao':
        return css`
          background-color: yellow;
        `
      case 'google':
        return css`
          background-color: #ffffff;
        `
      case 'naver':
        return css`
          background-color: #00bf18;
        `
      case 'apple':
        return css`
          background-color: #000000;
        `
    }
  }}
`
