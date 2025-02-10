'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

export const selectUserTasks = async () => {
  const session = await auth();
  if (!session) {
    console.error('selectUserEvents: no session found');
    return [];
  }
  const tasks = await prisma.tasks.findMany({
    where: {
      userId: session.user?.id,
    },
    include: {
      Events: {
        select: {
          id: true,
          title: true,
          description: true,
          eventStart: true,
          eventEnd: true,
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
    orderBy: {
      order: 'asc',
    },
  });
  return tasks;
};
