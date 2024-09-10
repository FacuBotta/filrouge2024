'use server';

import prisma from '@/lib/prisma';

export const updateTask = async (task: any) => {
  try {
    await prisma.tasks.update({
      where: {
        id: task.id,
      },
      data: {
        content: task.content,
        completed: task.completed,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: error };
  }
};
