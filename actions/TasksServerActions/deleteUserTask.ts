'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

export const deleteUserTask = async (id: string) => {
  const session = await auth();
  if (!session) {
    console.error('getConversationById: no session found');
    return;
  }
  try {
    await prisma.tasks.delete({
      where: {
        id: id,
        userId: session.user?.id as string,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error('deleteUserTask error:', error);
    return { ok: false, error: error };
  }
};
