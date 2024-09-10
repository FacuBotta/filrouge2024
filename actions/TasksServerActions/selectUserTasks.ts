'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

export const selectUserTasks = async (userId: string) => {
  const tasks = await prisma.tasks.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return tasks;
};
