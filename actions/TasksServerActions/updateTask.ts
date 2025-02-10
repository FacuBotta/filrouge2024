'use server';

import prisma from '@/lib/prisma';
import { Tasks } from '@prisma/client';

export const updateTask = async (task: Tasks) => {
  try {
    await prisma.tasks.update({
      where: {
        id: task.id,
      },
      data: {
        content: task.content,
        completed: task.completed,
        order: task.order,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};
