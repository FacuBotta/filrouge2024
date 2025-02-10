'use server';

import { updateTaskService } from '@/services/tasksServices';
import { Tasks } from '@prisma/client';

export const updateTask = async (task: Tasks) => {
  try {
    await updateTaskService({
      taskId: task.id,
      content: task.content,
      completed: task.completed,
      order: task.order,
    });
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};
