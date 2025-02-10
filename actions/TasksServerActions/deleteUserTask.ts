'use server';

import { auth } from '@/lib/auth/authConfig';
import { deleteTaskService } from '@/services/tasksServices';

export const deleteUserTask = async (taskId: string) => {
  const session = await auth();
  if (!session) {
    console.error('deleteUserTask: no session found');
    return;
  }
  try {
    await deleteTaskService({ taskId });
    return { ok: true };
  } catch (error) {
    console.error('deleteUserTask error:', error);
    return { ok: false, error };
  }
};
