import React, { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Polyline, Polygon } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '200px'
};

const center = {
  lat: 21.591890715958137,
  lng: 72.98995558826039,
};

const PlanCoordinates = [
  { lat: 21.59230813590892, lng: 72.98830054195507 },
  { lat: 21.591077757970215, lng: 72.98852986033096 },
  { lat: 21.59163964146428, lng: 72.99172482310838 },
  { lat: 21.592578990537927, lng: 72.9913994389264 },
  { lat: 21.592282202992322, lng: 72.98959588088908 },
  { lat: 21.592501191919755, lng: 72.9895617930224 },
  { lat: 21.59230813590892, lng: 72.98830054195507 },
];

const Farmmap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
  })
  const [map, setMap] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div className=" container farmermap">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapTypeId={'satellite'}
      >
        <Polygon
          path={PlanCoordinates}
          options={{
            strokeColor: "#FFFF3F",
            strokeOpacity: 1.0,
            strokeWeight: 1.5,
            fillColor: "#FFFF3F",
            fillOpacity: 0.35,
          }}
        />
      </GoogleMap>
    </div>
  ) : <></>

};


export default Farmmap;
