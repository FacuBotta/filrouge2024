'use server';

import prisma from '@/lib/prisma';

export const selectUserEvents = async (userId: string) => {
  try {
    const events = await prisma.events.findMany({
      where: {
        userId: userId,
      },
      include: {
        category: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        participants: true,
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
