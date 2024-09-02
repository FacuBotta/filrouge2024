'use server';
import prisma from '@/lib/prisma';
import { Conversation } from '@/types/types';

export const getConversationById = async (conversationId: string) => {
  console.log(conversationId);
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
    },
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
  });

  const formateConversation = {
    ...conversation,
    messages: conversation?.messages.map((message) => ({
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
  return formateConversation as Conversation;
};
