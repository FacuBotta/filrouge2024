'use client';

import { EventCoordinates } from '@/types/types';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
interface MapComponentProps {
  position: EventCoordinates;
}

const MapComponent: React.FC<MapComponentProps> = ({ position }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const [isClient, setIsClient] = useState(false);

  // Delete the window.google object to avoid conflicts with the Google Maps API
  // this is the solution to the error 'Google API is already presented'
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).google;
    }

    setIsClient(true);
  }, []);

  if (!isClient) return null;
  const place = {
    lat: position.lat ?? 0,
    lng: position.lng ?? 0,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
      <GoogleMap
        center={place}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        {place && <Marker position={place} />}
      </GoogleMap>
    </LoadScript>
  );
};
export default MapComponent;
