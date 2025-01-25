'use server';

import prisma from '@/lib/prisma';
import { EventByUser } from '@/types/types';

export const selectUserEvents = async (userId: string) => {
  try {
    const events: EventByUser[] | [] = await prisma.events.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        image: true,
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
