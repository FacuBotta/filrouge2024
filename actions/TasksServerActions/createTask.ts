'use server';

import { auth } from '@/lib/auth/authConfig';
import { createTaskService } from '@/services/tasksServices';

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
    const newTask = await createTaskService({
      userId: session.user.id,
      content: taskData.content,
      completed: taskData.completed,
      eventId: taskData.eventId,
      order: 0,
    });
    return { ok: true, newTask };
  } catch (error) {
    console.error(error);
    return { ok: false, error };
  }
};
