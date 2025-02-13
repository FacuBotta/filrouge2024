'use client';

import { declineEventInvitation } from '@/actions/eventsServerActions/declineEventInvitation';
import { Invitation } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeclineInvitationButtonProps {
  userInvitation: Invitation;
  className?: string;
}

export default function DeclineInvitationButton({
  userInvitation,
  className,
}: DeclineInvitationButtonProps) {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleDeclineInvitationToEvent() {
    setBtnLoading(true);

    const response = await declineEventInvitation({
      userInvitation,
      decliner: 'PARTICIPANT',
    });
    if (response?.ok) {
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error(response.message);
    }
    setBtnLoading(false);
  }
  return (
    <button
      onClick={() => handleDeclineInvitationToEvent()}
      className={`${className} primary-btn`}
      disabled={btnLoading}
    >
      Decliner l&apos;invitation
    </button>
  );
}
