'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  const position = { lat: 53.54992, lng: 10.00678 };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  return (
    <APIProvider apiKey={apiKey}>
      <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID"></Map>
    </APIProvider>
  );
};

export default MapComponent;
