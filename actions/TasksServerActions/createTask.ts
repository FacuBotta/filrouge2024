'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

interface NewTaskProps {
  content: string;
  completed: boolean;
  eventId: string | null;
}

export const createTask = async (taskData: NewTaskProps) => {
  const session = await auth();
  if (!session) {
    console.error('createTask: no session found');
    return;
  }
  try {
    const newTask = await prisma.tasks.create({
      data: {
        userId: session.user?.id as string,
        content: taskData.content as string,
        completed: taskData.completed as boolean,
        eventId: taskData.eventId || null,
        order: 0,
      },
    });
    return { ok: true, newTask };
  } catch (error) {
    console.error(error);
    return { ok: false, error };
  }
};
