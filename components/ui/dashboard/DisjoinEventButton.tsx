'use client';

import { disjoinEvent } from '@/actions/eventsServerActions/disjoinEvent';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface acceptInvitationBtnProps {
  eventId: string;
  userId: string;
  className?: string;
}

export default function DisjoinEventButton({
  eventId,
  userId,
  className,
}: acceptInvitationBtnProps) {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleAcceptInvitationToEvent() {
    setBtnLoading(true);
    const response = await disjoinEvent({ eventId, userId });
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
      Abandonner l&apos;événement
    </button>
  );
}
