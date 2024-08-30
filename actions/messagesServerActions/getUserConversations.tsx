'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

export async function getUserConversations() {
  const { user: sender } = (await auth()) || {};
  if (!sender) {
    console.error('getUserConversations: no sender found');
    return;
  }
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: sender.id,
        },
      },
    },
  });
  // console.log('getUserConversations:', conversations);
  return conversations;
}
