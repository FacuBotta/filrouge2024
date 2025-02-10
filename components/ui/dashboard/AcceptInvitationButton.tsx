'use client';

import { acceptEventInvitation } from '@/actions/eventsServerActions/acceptEventInvitation';
import { Invitation } from '@/types/types';
import { useState } from 'react';

interface acceptInvitationBtnProps {
  userInvitation: Invitation;
  className?: string;
}

export default function AcceptInvitationButton({
  userInvitation,
  className,
}: acceptInvitationBtnProps) {
  const [btnText, setBtnText] = useState<string>("Accepter l'invitation");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  async function handleAcceptInvitationToEvent() {
    setBtnLoading(true);

    const acceptInvitationParams = {
      userInvitationId: userInvitation.id,
      participantId: userInvitation.participantId,
      eventId: userInvitation.eventId,
    };

    const response = await acceptEventInvitation(acceptInvitationParams);
    if (response?.ok) {
      setBtnText('Invitation acceptée !');
    } else {
      setError('Erreur lors de l&apos;acceptation de l&apos;invitation');
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
