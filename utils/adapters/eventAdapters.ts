import { BasicEventDataService } from '@/types/servicesTypes/types';
import { BasicEventData } from '@/types/types';

export const mapBasicEventData = (
  event: BasicEventDataService
): BasicEventData => {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    creator: event.user,
    eventStart: event.eventStart,
    eventEnd: event.eventEnd,
    isPublic: event.isPublic,
    image: event.image,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    conversation: event.conversation,
    participants: event.participants,
    formattedAddress: event.formattedAddress,
    category: event.category,
    _count: event._count,
  };
};
