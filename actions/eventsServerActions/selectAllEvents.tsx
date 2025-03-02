'use server';

import { selectAllEventsService } from '@/services/eventServices';
import { BasicEventDataService } from '@/types/servicesTypes/types';
import { BasicEventData } from '@/types/types';
import { mapBasicEventData } from '@/utils/adapters/eventAdapters';

export const selectAllEvents = async (): Promise<BasicEventData[] | []> => {
  try {
    const eventsData: BasicEventDataService[] | [] =
      await selectAllEventsService();
    const events = eventsData.map((event) => mapBasicEventData(event));
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
