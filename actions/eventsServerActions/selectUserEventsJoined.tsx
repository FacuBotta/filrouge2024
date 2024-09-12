import prisma from '@/lib/prisma';
import { UserJoinedEvent } from '@/types/types';
import { Events } from '@prisma/client';

export const selectUserEventsJoined = async (
  userId: string
): Promise<UserJoinedEvent[]> => {
  try {
    const userEvents = await prisma.userEvents.findMany({
      where: {
        userId: userId,
      },
      include: {
        event: {
          select: {
            id: true,
            userId: true, // Creator of the event
            title: true,
            description: true,
            eventStart: true,
            eventEnd: true,
            createdAt: true,
            updatedAt: true,
            category: {
              select: {
                id: true,
                title: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return userEvents.map((userEvent) => userEvent.event);
  } catch (error) {
    console.error(error);
    return [];
  }
};
