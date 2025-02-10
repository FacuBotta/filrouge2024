'use server';

import { auth } from '@/lib/auth/authConfig';
import { selectEventsByUserService } from '@/services/eventServices';
import { EventWithUserAndCount } from '@/types/types';

export const selectUserEvents = async () => {
  const session = await auth();
  if (!session) {
    console.error('selectUserEvents: no session found');
    return [];
  }
  try {
    const events: EventWithUserAndCount[] | [] =
      await selectEventsByUserService(session.user.id);
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
