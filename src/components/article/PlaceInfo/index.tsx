import { useEffect, useState } from "react";
import axios from "axios";

import MarketIcon from "../../../assets/icons/market.svg?react";
import CalendarAddIcon from "../../../assets/icons/calendar_add_border.svg?react";
import BookMarkIcon from "../../../assets/icons/bookmark.svg?react";
import RightChevron from "../../../assets/icons/chevron_right.svg?react";

import * as S from "./style";
import { useNavigate } from "react-router-dom";
import { get } from "../../../utils/api";

interface Props {
    placeId: number,
    imageURL: string,
}

interface TPlace {
    region: string,
    name:string,
    theme: string,
    address: string,
    number: string,
    opening_hours: string,
    website:string,
    image: string[],
}

function PlaceInfo({placeId, imageURL} : Props){
    const navigate = useNavigate();
    const [data, setData] = useState<TPlace>();

    useEffect(() => {
        get<TPlace>(`/place/${placeId}`)
            .then((response) => {
                setData(response.data);
            });
    }, [])

    return(
        <S.Container>
            {data && 
            <>
                <img src={imageURL}/>
                <S.Infomation>
                    <S.TextContainer>
                        <S.Name onClick={() => {
                            navigate("/")
                        }}>    
                            <MarketIcon />
                            <span>{data.name}</span>
                            <RightChevron />
                        </S.Name>
                        <S.Address>{data.address}</S.Address>
                    </S.TextContainer>
                    <S.Buttons>
                        {/* [SugarSyrup] @TODO: 단일 장소 일정에 추가 로직 구현 */}
                        <S.Icon>
                            <CalendarAddIcon />
                            <span>일정에 추가</span>
                        </S.Icon>
                        {/* [SugarSyrup] @TODO: 단일 장소 스크랩 로직 구현 */}
                        <S.Icon>
                            <BookMarkIcon />
                            <span>장소 스크랩</span>
                        </S.Icon>
                    </S.Buttons>
                </S.Infomation>
            </>
            }
        </S.Container>
    )
}
export default PlaceInfo;