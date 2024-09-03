'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth/authConfig';
import { revalidatePath } from 'next/cache';

export async function handleDeleteConversation(formData: FormData) {
  const conversationId = formData.get('conversationId') as string;
  const { user } = (await auth()) || {};
  if (!user) {
    console.error('handleDeleteConversation: no user found');
    return;
  }
  // check if the user is the creator of the conversation
  const userRoleInConversation = await prisma.userConversation.findUnique({
    where: {
      userId_conversationId: {
        userId: user.id as string,
        conversationId: conversationId,
      },
    },
  });
  if (!userRoleInConversation || userRoleInConversation.role !== 'CREATOR') {
    console.error('handleDeleteConversation: user is not the creator');
    return;
  }
  // delete the messages, userConversations and conversation
  await prisma.$transaction([
    prisma.message.deleteMany({ where: { conversationId } }),
    prisma.userConversation.deleteMany({ where: { conversationId } }),
    prisma.conversation.delete({ where: { id: conversationId } }),
  ]);

  console.log('conversation deleted');
  revalidatePath('/dashboard/messages');
}
