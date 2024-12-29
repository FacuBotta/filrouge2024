'use server';

import prisma from '@/lib/prisma';
import { Events } from '@prisma/client';

export const selectAllEvents = async (): Promise<Events[]> => {
  try {
    const events = await prisma.events.findMany({
      orderBy: {
        title: 'asc',
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
