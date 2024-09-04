'use server';
import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { Conversation } from '@/types/types';

export const getConversationById = async (conversationId: string) => {
  const session = await auth();
  if (!session) {
    console.error('getConversationById: no session found');
    return;
  }
  const userId = session.user?.id;
  const userConversation = await prisma.userConversation.findUnique({
    where: {
      userId_conversationId: {
        userId: userId as string,
        conversationId: conversationId,
      },
    },
    include: {
      conversation: {
        include: {
          messages: {
            include: {
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
            },
          },
        },
      },
    },
  });
  const formateUserConversation = {
    id: userConversation?.conversationId as string,
    title: userConversation?.conversation?.title,
    createdAt: userConversation?.conversation?.createdAt,
    updatedAt: userConversation?.conversation?.updatedAt,
    joinedAt: userConversation?.joinedAt,
    role: userConversation?.role,
    messages: userConversation?.conversation?.messages.map((message) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      sender: {
        id: message.sender.id,
        name: message.sender.name,
        username: message.sender.username,
        email: message.sender.email,
        image: message.sender.image,
        updatedAt: message.sender.updatedAt,
      },
    })),
  };

  return formateUserConversation as Conversation;
};
