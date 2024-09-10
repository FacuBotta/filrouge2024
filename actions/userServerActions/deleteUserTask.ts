'use server';

import { auth } from '@/lib/auth/authConfig';

export const deleteUserTask = async (id: string) => {
  const session = await auth();
  if (!session) {
    console.error('getConversationById: no session found');
    return;
  }
  try {
    console.log('user', session.user);
    console.log('task', id);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: error };
  }
};
