/* eslint-disable no-undef */
'use client';
import { EventAddress } from '@/types/types';
import type { Libraries } from '@react-google-maps/api';
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';

const libraries: Libraries = ['places'];

const MapWithAutocomplete = ({
  onAddressChange,
}: {
  onAddressChange: (address: EventAddress | null) => void;
}) => {
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const [place, setPlace] = useState({ lat: 53.54992, lng: 10.00678 });
  const [zoom, setZoom] = useState(10);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const selectedPlace = autocompleteRef.current.getPlace();
      if (selectedPlace?.geometry && selectedPlace.geometry?.location) {
        const finalAddress = {
          url: selectedPlace.url,
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
          formattedAddress: selectedPlace.formatted_address,
          vicinity: selectedPlace.vicinity,
        };

        setPlace({
          lat: finalAddress.lat,
          lng: finalAddress.lng,
        });
        setZoom(20);
        onAddressChange(finalAddress);
      }
    }
  };
  useEffect(() => {
    if (!isApiLoaded) {
      setIsApiLoaded(true);
    }
  }, [isApiLoaded]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      {isApiLoaded && (
        <div>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              placeholder="Chercher un lieu"
              className="p-2 border-2 rounded-lg bg-none my-3 w-full"
            />
          </Autocomplete>
          <div className="rounded-lg border-2 h-[500px] w-full">
            <GoogleMap
              center={place}
              zoom={zoom}
              mapContainerStyle={{ width: '100%', height: '100%' }}
            >
              <Marker position={place} />
            </GoogleMap>
          </div>
        </div>
      )}
    </LoadScript>
  );
};

export default MapWithAutocomplete;
