'use server';

import prisma from '@/lib/prisma';
import { EventWithUserAndCount } from '@/types/types';

export const selectAllEvents = async (): Promise<
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
