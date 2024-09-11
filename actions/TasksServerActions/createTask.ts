'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

export const createTask = async (task: any, tasksLength: number) => {
  const session = await auth();
  if (!session) {
    console.error('createTask: no session found');
    return;
  }
  try {
    const newTask = await prisma.tasks.create({
      data: {
        userId: session.user?.id as string,
        content: task.content as string,
        completed: task.completed as boolean,
        order: tasksLength + 1,
      },
    });
    return { ok: true, newTask: newTask };
  } catch (error) {
    console.error(error);
    return { ok: false, error: error };
  }
};
