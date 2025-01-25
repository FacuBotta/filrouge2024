'use server';

import prisma from '@/lib/prisma';
import { EventWithUserAndCount } from '@/types/types';

export const selectEventById = async (
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
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            image: true,
            email: true,
            username: true,
            description: true,
            _count: {
              select: {
                Ratings: true,
                EventsCreated: true,
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
