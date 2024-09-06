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

  // Fetch all the message IDs related to the conversation
  const messages = await prisma.message.findMany({
    where: { conversationId },
    select: { id: true },
  });
  const messageIds = messages.map((message) => message.id);

  // delete the messageStatuses, messages, userConversations, and conversation
  await prisma.$transaction([
    // Delete the related message statuses
    prisma.messageStatus.deleteMany({
      where: {
        messageId: { in: messageIds },
      },
    }),
    // Delete the messages
    prisma.message.deleteMany({
      where: { conversationId },
    }),
    // Delete the user conversations
    prisma.userConversation.deleteMany({
      where: { conversationId },
    }),
    // Delete the conversation
    prisma.conversation.delete({
      where: { id: conversationId },
    }),
  ]);

  revalidatePath('/dashboard/messages');
}
