import React, { ReactNode, useCallback } from "react";
import {
  GoogleMap as GoogleMapBox,
  MarkerProps,
  useJsApiLoader,
} from "@react-google-maps/api";
import mapPinIcon from "../../assets/icons/image_placeholder_circle.svg";

export interface Position {
  lat: number;
  lng: number;
}
interface Props {
  width?: string;
  height?: string;
  center: Position;
  children?: ReactNode;
  markers?: MarkerProps[];
}
function GoogleMap({
  width = "100%",
  height = "100%",
  center = { lat: 0, lng: 0 },
  children,
  markers,
}: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_API_KEY,
  });

  /** Google Map에 마커를 추가하거나, 지도의 특정 영역을 확대/축소하는 등의 작업을 할 수 있음. */
  const [map, setMap] = React.useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    if (markers) {
      console.log(markers);
      markers?.map(({ position, label }) => {
        const newMarkers = new google.maps.Marker({
          position: position,
          icon: mapPinIcon,
          label: label,
          map: map,
        });
      });
    }

    setMap(map);
    // 아래 주석을 해제하여 콘솔에서 map의 프로퍼티나 메소드를 확인할 수 있습니다.
    // console.dir(map);
  }, []);
  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  const mapOptions = {
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    minZoom: 4,
    maxZoom: 18,
    disableDefaultUI: true,
  };

  return isLoaded ? (
    <GoogleMapBox
      mapContainerStyle={{ width, height }}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {children}
    </GoogleMapBox>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMap);
