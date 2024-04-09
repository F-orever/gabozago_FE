import styled from "styled-components";

import { Link } from "react-router-dom";

export const CheckBoxsContainer = styled.div`
    width:100%;
    margin-top:46px;

    display:flex;
    flex-direction:column;
    gap:10px;
`

export const CheckBoxContainer = styled.div`
    width:100%;
    padding:12px 20px;
    border:1px solid #dcdcdc;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    gap:16px;

    input {
        width:20px;
        height:20px;
    }
`

export const CheckBoxInputContainer = styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    gap:7px;

    label, a{
        margin-left:7px;
    }
`

export const CheckBoxLabelHighlight = styled.label`
    color: ${({theme}) => theme.black};
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
`

export const CheckBoxLabel = styled.label`
    color: ${({theme}) => theme.black};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
`

export const CheckBoxLabelLink = styled(Link)`
    color: ${({theme}) => theme.black};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-decoration-line: underline;
`

export const CheckBoxRequired = styled.span`
    color: #4061DB;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;

    align-self:flex-end;
`

export const CheckBoxNotRequired= styled.span`
    color: #ADADAD;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;

    align-self:flex-end;
`