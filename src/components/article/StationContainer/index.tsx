import DoubleCircleIcon from "../../../assets/icons/double_circle.svg?react";
import BookIcon from "../../../assets/icons/book.svg?react";
import useModal from "../../../hooks/useModal";
import isLogin  from "../../../utils/isLogin";

import * as S from "./style";

interface Props {
  data: {
    index: number;
    name: string;
    type: "station";
  }[];
  refs: React.MutableRefObject<null[] | HTMLDivElement[]>;
}

function StationContainer({ data, refs }: Props) {
  const { Modal, modalOpen, modalClose, isOpend } = useModal({});

    return(
        <>
                <Modal>
                    <S.ModalTitle>Station 보기</S.ModalTitle>
                    <S.StationList isBackground={false}>
                        {
                            data !== undefined && data.map((station, index) => 
                                <S.StationItem>
                                    <S.Linker isFirst={index === 0} isLast={index+1===data.length}>
                                        <DoubleCircleIcon />
                                    </S.Linker>
                                    <S.TextContainer isLast={index+1===data.length} onClick={() => {
                                        if(isLogin()){
                                            refs.current[station.index]?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                            modalClose()
                                        }
                                    }}>
                                        <S.StationNumber>Station {station.index}</S.StationNumber>
                                        <S.StationName dangerouslySetInnerHTML={{__html: station.name}} />
                                    </S.TextContainer>
                                </S.StationItem>
                            )
                        }
                    </S.StationList>
                </Modal>
            <S.StationList isBackground={true}>
                {
                    data.map((station, index) => 
                        <S.StationItem>
                            <S.Linker isFirst={index === 0} isLast={index+1===data.length}>
                                <DoubleCircleIcon />
                            </S.Linker>
                            <S.TextContainer isLast={index+1===data.length}  onClick={() => {
                                    if(isLogin()){
                                        refs.current[station.index]?.scrollIntoView({
                                        behavior: "smooth",
                                        });
                                        modalClose();
                                    }
                                }}>
                                <S.StationNumber>Station {station.index}</S.StationNumber>
                                <S.StationName dangerouslySetInnerHTML={{__html: station.name}} />
                            </S.TextContainer>
                        </S.StationItem>
                    )
                }
            </S.StationList>
            <S.StationIcon onClick={() => {modalOpen()}}>
                <BookIcon />
            </S.StationIcon>
        </>
    )
}

export default StationContainer;
