import { auth } from '@/lib/auth/authConfig';
import { selectEventsJoinedByUserService } from '@/services/eventServices';
import { EventWithUserAndCount } from '@/types/types';

export const selectUserEventsJoined = async (): Promise<
  EventWithUserAndCount[]
> => {
  const session = await auth();
  if (!session) {
    console.error('selectUserEvents: no session found');
    return [];
  }
  // TODO : ver que onda esto...
  try {
    const userEvents = await selectEventsJoinedByUserService(session.user.id);

    return userEvents;
  } catch (error) {
    console.error(error);
    return [];
  }
};
