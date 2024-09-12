'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

export const joinUserToEvent = async (eventId: string) => {
  try {
    const session = await auth();
    if (!session) {
      console.error('joinUserToEvent: no session found');
      return;
    }
    const userId = session.user?.id as string;
    await prisma.userEvents.create({
      data: {
        userId: userId,
        eventId: eventId,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: error };
  }
};
