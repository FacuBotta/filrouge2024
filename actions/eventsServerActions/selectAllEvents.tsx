'use server';

import { selectAllEventsService } from '@/services/eventServices';
import { EventWithUserAndCount } from '@/types/types';

export const selectAllEvents = async (): Promise<
  EventWithUserAndCount[] | []
> => {
  try {
    // TODO : agregar props pour les filtres
    const events: EventWithUserAndCount[] | [] = await selectAllEventsService();
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
