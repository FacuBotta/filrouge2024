'use server';

import { auth } from '@/lib/auth/authConfig';
import { selectTasksByUser } from '@/services/tasksServices';

export const selectUserTasks = async () => {
  const session = await auth();
  if (!session) {
    console.error('selectUserEvents: no session found');
    return [];
  }
  const tasks = await selectTasksByUser({ userId: session.user.id });
  return tasks;
};
