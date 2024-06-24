import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from './style';

import { selectedPlacesState } from '../../../recoil/mytrip/selectedPlacesState';

import Typography from '../../common/Typography';
import LocationPlaceholderIcon from '../../mytrip/LocationPlaceholderIcon';

interface Props {
  id: number;
  name: string;
  theme: string;
  thumbnail?: string;
  keyword?: string;
  location: string;
  locations: string[];
  popupOpen: () => void;
  setNewLocation: React.Dispatch<React.SetStateAction<string>>;
}

function RecommendationListItem({
  thumbnail,
  name,
  theme,
  id,
  keyword,
  location,
  popupOpen,
  setNewLocation,
  locations,
}: Props) {
  const [selectedPlaces, setSelectedPlaces] = useRecoilState(selectedPlacesState);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(selectedPlaces.find((selectedPlace) => selectedPlace.id === id) !== undefined);
  }, [selectedPlaces]);

  function onBtnClick() {
    if (isActive) {
      setSelectedPlaces((prev) => prev.filter((SelectedPlace) => SelectedPlace.id !== id));
    } else {
      setSelectedPlaces((prev) => [
        ...prev,
        {
          name,
          thumbnail,
          id,
          location,
        },
      ]);

      if (!locations.includes(location)) {
        setNewLocation(location);
        popupOpen();
      }
    }
  }

  return (
    <S.Container>
      <S.LeftItems>
        <S.Thumbnail>
          {thumbnail ? (
            <img src={thumbnail} />
          ) : (
            <LocationPlaceholderIcon type={((id % 5) + 1) as 1 | 2 | 3 | 4 | 5} />
          )}
        </S.Thumbnail>
        <S.Infomation>
          {keyword ? (
            <Typography.Title size="lg">
              {name.split('').map((word, index) => {
                if (
                  name.indexOf(keyword) <= index &&
                  index < name.indexOf(keyword) + keyword.length
                ) {
                  return <S.HighlightName>{word}</S.HighlightName>;
                }
                return <>{word}</>;
              })}
            </Typography.Title>
          ) : (
            <Typography.Title size="lg">{name}</Typography.Title>
          )}
          <Typography.Label size="lg" color="#A6A6A6">
            <span>{theme}</span>
          </Typography.Label>
        </S.Infomation>
      </S.LeftItems>
      <S.Button isActive={isActive} onClick={onBtnClick}>
        <Typography.Label size="lg" color="inherit">
          선택
        </Typography.Label>
      </S.Button>
    </S.Container>
  );
}

export default RecommendationListItem;
