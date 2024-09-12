'use server';

import prisma from '@/lib/prisma';

export const selectUserTasks = async (userId: string) => {
  const tasks = await prisma.tasks.findMany({
    where: {
      userId: userId,
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
