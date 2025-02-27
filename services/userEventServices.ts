import prisma from '@/lib/prisma';
import { createUserEventServiceProps } from '@/types/servicesTypes/types';
import { UserEvents } from '@prisma/client';
import 'server-only';

export const createUserEventService = async ({
  userId,
  eventId,
}: createUserEventServiceProps): Promise<UserEvents> => {
  try {
    const userEvent = await prisma.userEvents.create({
      data: {
        userId,
        eventId,
      },
    });
    return userEvent;
  } catch (error) {
    console.error('createUserEventService: error', error);
    throw new Error('Service error: createUserEventService');
  }
};

export const deleteUserEventService = async ({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}): Promise<UserEvents | null> => {
  try {
    const userEvent = await prisma.userEvents.delete({
      where: {
        userId_eventId: { userId, eventId },
      },
    });
    return userEvent;
  } catch (error) {
    console.error('deleteUserEventService: error', error);
    throw new Error('Service error: deleteUserEventService');
  }
};
