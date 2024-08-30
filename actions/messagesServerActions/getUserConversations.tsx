'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
// TODO: make import of the basicUser info type
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
    include: {
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });
  // console.log('getUserConversations:', conversations);
  return conversations;
}
