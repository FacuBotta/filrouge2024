'use client';

import {
  joinEventRequest,
  JoinEventRequestProps,
} from '@/actions/eventsServerActions/jointEventRequest';
import { useState } from 'react';

interface joinEventBtnProps {
  joinEventParams: JoinEventRequestProps;
  className?: string;
}

export default function JoinEventButton({
  joinEventParams,
  className,
}: joinEventBtnProps) {
  const [btnText, setBtnText] = useState<string>("Rejoindre l'événement 🚀");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  async function handleJointEventClick() {
    setBtnLoading(true);

    const response = await joinEventRequest(joinEventParams);
    if (response?.ok) {
      setBtnText('Invitation envoyée !');
    } else {
      setError('Erreur lors de l&apos;acceptation de l&apos;invitation');
    }
    setBtnLoading(false);
  }
  return (
    <>
      <button
        onClick={() => handleJointEventClick()}
        className={`${className} primary-btn`}
        disabled={btnLoading}
      >
        {btnText}
      </button>
      {error && <p className="text-red-500">Une erreur est survenue 😑</p>}
    </>
  );
}
