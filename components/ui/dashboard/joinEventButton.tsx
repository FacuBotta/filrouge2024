'use client';

import {
  joinEventRequest,
  JoinEventRequestProps,
} from '@/actions/eventsServerActions/jointEventRequest';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface joinEventBtnProps {
  joinEventParams: JoinEventRequestProps;
  className?: string;
}

export default function JoinEventButton({
  joinEventParams,
  className,
}: joinEventBtnProps) {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleJointEventClick() {
    setBtnLoading(true);

    const response = await joinEventRequest(joinEventParams);
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
      onClick={() => handleJointEventClick()}
      className={`${className} primary-btn`}
      disabled={btnLoading}
    >
      Rejoindre l&apos;événement 🚀
    </button>
  );
}
