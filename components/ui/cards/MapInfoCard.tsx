'use client';

import { EventAddress } from '@/types/types';
import type { Libraries } from '@react-google-maps/api';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const libraries: Libraries = ['places'];

type MapProps = {
  address: EventAddress;
  zoom: number;
};

const MapComponent = ({ address, zoom }: MapProps) => {
  const place = { lat: address.lat, lng: address.lng };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <GoogleMap
        center={place}
        zoom={zoom}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        <Marker position={place} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
