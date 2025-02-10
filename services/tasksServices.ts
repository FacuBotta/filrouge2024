import prisma from '@/lib/prisma';
import { Tasks } from '@prisma/client';

export const createTaskService = async ({
  userId,
  content,
  completed,
  eventId,
  order,
}: {
  userId: string;
  content: string;
  completed: boolean;
  eventId: string | null;
  order: number;
}): Promise<Tasks | null> => {
  try {
    const newTask = await prisma.tasks.create({
      data: {
        userId,
        content,
        completed,
        eventId,
        order,
      },
    });
    return newTask;
  } catch (error) {
    console.error('createTaskService: error', error);
    throw new Error('Service error: createTaskService');
  }
};

export const deleteTaskService = async ({ taskId }: { taskId: string }) => {
  try {
    await prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });
    return true;
  } catch (error) {
    console.error('deleteTaskService: error', error);
    throw new Error('Service error: deleteTaskService');
  }
};

export const selectTasksByUser = async ({
  userId,
}: {
  userId: string;
}): Promise<Tasks[]> => {
  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        userId,
      },
      include: {
        Events: {
          select: {
            id: true,
            title: true,
            description: true,
            eventStart: true,
            eventEnd: true,
            category: {
              select: {
                id: true,
                title: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
    return tasks;
  } catch (error) {
    console.error('selectTasksByUser: error', error);
    throw new Error('Service error: selectTasksByUser');
  }
};

export const updateTaskService = async ({
  taskId,
  content,
  completed,
  order,
}: {
  taskId: string;
  content: string;
  completed: boolean;
  order: number;
}): Promise<Tasks | null> => {
  try {
    const task = await prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        content,
        completed,
        order,
      },
    });
    return task;
  } catch (error) {
    console.error('UpdateTasksService: error', error);
    throw new Error('Service error: UpdateTasksService');
  }
};
