import prisma from '@/lib/prisma';
import { createEventServiceProps } from '@/types/servicesTypes/types';
import { Events } from '@prisma/client';
import { EventWithUserAndCount } from '@/types/types';

export const createEventService = async (
  newEvent: createEventServiceProps
): Promise<Events> => {
  try {
    const newEven = await prisma.events.create({
      data: newEvent,
    });
    return newEven;
  } catch (error) {
    console.error('createEventService: error', error);
    throw new Error('Service error: createEventService');
  }
};

export const deleteEventService = async (eventId: string) => {
  try {
    await prisma.events.delete({
      where: { id: eventId },
    });
    return true;
  } catch (error) {
    console.error('deleteEventService: error', error);
    throw new Error('Service error: deleteEventService');
  }
};

export const selectAllEventsService = async (): Promise<
  EventWithUserAndCount[] | []
> => {
  try {
    const events: EventWithUserAndCount[] | [] = await prisma.events.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        eventStart: true,
        eventEnd: true,
        isPublic: true,
        image: true,
        locationUrl: true,
        lat: true,
        lng: true,
        vicinity: true,
        formattedAddress: true,
        createdAt: true,
        updatedAt: true,
        conversation: {
          select: {
            id: true,
          },
        },
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            image: true,
            description: true,
            _count: {
              select: {
                EventsCreated: true,
                Ratings: true,
              },
            },
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
      // TODO : mettre ca en place quand on aura des événements publics
      /* where: {
        isPublic: true,
      }, */
      orderBy: {
        title: 'asc',
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const selectEventByIdService = async (
  id: string
): Promise<EventWithUserAndCount | null> => {
  try {
    const event: EventWithUserAndCount | null = await prisma.events.findFirst({
      select: {
        id: true,
        title: true,
        description: true,
        eventStart: true,
        eventEnd: true,
        isPublic: true,
        image: true,
        locationUrl: true,
        lat: true,
        lng: true,
        vicinity: true,
        formattedAddress: true,
        createdAt: true,
        updatedAt: true,
        conversation: {
          select: {
            id: true,
          },
        },
        participants: {
          select: {
            userId: true,
          },
        },
        UserInvitations: {
          select: {
            id: true,
            participantId: true,
            creatorId: true,
            eventId: true,
            conversationId: true,
            createdAt: true,
            status: true,
          },
        },
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            image: true,
            description: true,
            _count: {
              select: {
                EventsCreated: true,
                Ratings: true,
              },
            },
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
      where: {
        id,
      },
    });

    if (!event) {
      return null;
    }

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const selectEventsByCategoryService = async (
  categoryId: string
): Promise<EventWithUserAndCount[] | []> => {
  try {
    const events = await prisma.events.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        eventStart: true,
        eventEnd: true,
        isPublic: true,
        image: true,
        locationUrl: true,
        lat: true,
        lng: true,
        vicinity: true,
        formattedAddress: true,
        createdAt: true,
        updatedAt: true,
        conversation: {
          select: {
            id: true,
          },
        },
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            image: true,
            description: true,
            _count: {
              select: {
                EventsCreated: true,
                Ratings: true,
              },
            },
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
      where: {
        categoryId,
      },
      orderBy: {
        title: 'asc',
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const selectEventsByUserService = async (
  userId: string
): Promise<EventWithUserAndCount[] | []> => {
  try {
    const events = await prisma.events.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        eventStart: true,
        eventEnd: true,
        isPublic: true,
        image: true,
        locationUrl: true,
        lat: true,
        lng: true,
        vicinity: true,
        formattedAddress: true,
        createdAt: true,
        updatedAt: true,
        Tasks: {
          select: {
            id: true,
            userId: true,
            eventId: true,
            content: true,
            completed: true,
            createdAt: true,
            order: true,
          },
        },
        conversation: {
          select: {
            id: true,
          },
        },
        participants: {
          select: {
            userId: true,
          },
        },
        UserInvitations: {
          select: {
            id: true,
            participantId: true,
            creatorId: true,
            eventId: true,
            conversationId: true,
            createdAt: true,
            status: true,
          },
        },
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },

      orderBy: {
        eventStart: 'asc',
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
