'use client';

import { acceptEventInvitation } from '@/actions/eventsServerActions/acceptEventInvitation';
import { Invitation } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface acceptInvitationBtnProps {
  userInvitation: Invitation;
  className?: string;
}

export default function AcceptInvitationButton({
  userInvitation,
  className,
}: acceptInvitationBtnProps) {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleAcceptInvitationToEvent() {
    setBtnLoading(true);
    const acceptInvitationParams = {
      userInvitationId: userInvitation.id,
      participantId: userInvitation.participantId,
      eventId: userInvitation.eventId,
    };

    const response = await acceptEventInvitation(acceptInvitationParams);
    if (response?.ok) {
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error(response?.message);
    }
    setBtnLoading(false);
  }
  return (
    <button
      onClick={() => handleAcceptInvitationToEvent()}
      className={`${className} primary-btn`}
      disabled={btnLoading}
    >
      Accepter l&apos;invitation
    </button>
  );
}
