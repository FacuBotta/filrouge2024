'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { Conversation } from '@/types/types';

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
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      messages: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          sender: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
              image: true,
              updatedAt: true,
            },
          },
          messageStatuses: {
            where: {
              userId: sender.id,
              status: 'UNSEEN',
            },
            select: {
              id: true,
            },
          },
        },
      },
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
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedConversations = conversations.map((conversation) => {
    const unreadMessages = conversation.messages.reduce((count, message) => {
      return count + message.messageStatuses.length;
    }, 0);

    return {
      id: conversation.id,
      title: conversation.title,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      unreadMessages,
      messages: conversation.messages,
      participants: conversation.participants.map((participant) => ({
        id: participant.user.id,
        name: participant.user.name,
        username: participant.user.username,
        email: participant.user.email,
        image: participant.user.image,
        joinedAt: participant.joinedAt,
        updatedAt: participant.user.updatedAt,
      })),
    };
  });

  return formattedConversations;
}
