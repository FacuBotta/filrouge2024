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
  existingAddress,
}: {
  onAddressChange: (address: EventAddress | null) => void;
  existingAddress?: EventAddress | null;
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
  // Delete the window.google object to avoid conflicts with the Google Maps API
  // this is the solution to the error 'Google API is already presented'
  useEffect(() => {
    if (existingAddress) {
      setPlace({
        lat: existingAddress.lat as number,
        lng: existingAddress.lng as number,
      });
      setZoom(20);
    }
    if (typeof window !== 'undefined' && window.google) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).google;
    }
  }, [existingAddress]);
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
              className="newEventInput w-full mb-5"
              defaultValue={existingAddress?.formattedAddress ?? ''}
            />
          </Autocomplete>
          <div className="rounded-lg border-2 border-black dark:border-dark-grey/50 overflow-hidden h-[500px] w-full">
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
