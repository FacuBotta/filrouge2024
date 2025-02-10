import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { UserJoinedEvent } from '@/types/types';

export const selectUserEventsJoined = async (): Promise<UserJoinedEvent[]> => {
  const session = await auth();
  if (!session) {
    console.error('selectUserEvents: no session found');
    return [];
  }
  try {
    const userEvents = await prisma.userEvents.findMany({
      where: {
        userId: session.user?.id,
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
