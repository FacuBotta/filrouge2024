'use client';

import { declineEventInvitation } from '@/actions/eventsServerActions/declineEventInvitation';
import { Invitation } from '@/types/types';
import { useState } from 'react';

interface DeclineInvitationButtonProps {
  userInvitation: Invitation;
  className?: string;
}

export default function DeclineInvitationButton({
  userInvitation,
  className,
}: DeclineInvitationButtonProps) {
  const [btnText, setBtnText] = useState<string>("Decliner l'invitation");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  async function handleDeclineInvitationToEvent() {
    setBtnLoading(true);

    const response = await declineEventInvitation({
      userInvitation,
      decliner: 'PARTICIPANT',
    });
    if (response?.ok) {
      setBtnText('Invitation déclinée');
    } else {
      setError('Une erreur est survenue 😑');
    }
    setBtnLoading(false);
  }
  return (
    <>
      <button
        onClick={() => handleDeclineInvitationToEvent()}
        className={`${className} primary-btn`}
        disabled={btnLoading}
      >
        {btnText}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
