'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { Conversation } from '@/types/types';

export async function getUserConversations(): Promise<
  Conversation[] | undefined
> {
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
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      participants: {
        select: {
          joinedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
              image: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  });

  const formattedConversations = conversations.map((conversation) => ({
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    participants: conversation.participants.map((participant) => ({
      id: participant.user.id,
      name: participant.user.name,
      username: participant.user.username,
      email: participant.user.email,
      image: participant.user.image,
      joinedAt: participant.joinedAt,
      updatedAt: participant.user.updatedAt,
    })),
  }));

  return formattedConversations;
}
