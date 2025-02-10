'use server';

import { selectEventByIdService } from '@/services/eventServices';
import { EventWithUserAndCount } from '@/types/types';

export const selectEventById = async (
  id: string
): Promise<EventWithUserAndCount | null> => {
  try {
    const event: EventWithUserAndCount | null =
      await selectEventByIdService(id);

    if (!event) {
      return null;
    }

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};
