'use server';

import { auth } from '@/lib/auth/authConfig';
import { selectEventsByUserService } from '@/services/eventServices';
import { EventWithUserAndCount } from '@/types/types';

export const selectUserEvents = async ({ userId }: { userId: string }) => {
  const session = await auth();
  if (!session) {
    console.error('selectUserEvents: no session found');
    return [];
  }
  try {
    const events: EventWithUserAndCount[] | [] =
      await selectEventsByUserService(userId);
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
