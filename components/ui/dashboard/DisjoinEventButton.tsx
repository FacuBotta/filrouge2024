'use client';

import { disjoinEvent } from '@/actions/eventsServerActions/disjoinEvent';
import { EventWithUserAndCount } from '@/types/types';
import { useState } from 'react';

interface acceptInvitationBtnProps {
  event: EventWithUserAndCount;
  userId: string;
  className?: string;
}

export default function DisjoinEventButton({
  event,
  userId,
  className,
}: acceptInvitationBtnProps) {
  const [btnText, setBtnText] = useState<string>("Abandonner l'événement");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  async function handleAcceptInvitationToEvent() {
    setBtnLoading(true);

    const response = await disjoinEvent({ event, userId });
    if (response?.ok) {
      setBtnText("Vous avez abandonné l'événement");
    } else {
      setError('Une erreur est survenue 😑');
    }
    setBtnLoading(false);
  }
  return (
    <>
      <button
        onClick={() => handleAcceptInvitationToEvent()}
        className={`${className} primary-btn`}
        disabled={btnLoading}
      >
        {btnText}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
