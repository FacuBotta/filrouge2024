'use server';

import prisma from '@/lib/prisma';

export const selectUserTasks = async (userId: string) => {
  const tasks = await prisma.tasks.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      order: 'asc',
    },
  });
  return tasks;
};
