'use client';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

type positionProps = {
  lat: number;
  lng: number;
};

const MapComponent = (position: positionProps) => {
  // const position = { lat: 53.54992, lng: 10.00678 };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
      <GoogleMap
        center={position}
        zoom={10}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      ></GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
