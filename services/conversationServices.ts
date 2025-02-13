import prisma from '@/lib/prisma';
import { createConversationServiceProps } from '@/types/servicesTypes/types';
import { Conversation } from '@prisma/client';

export const createConversationService = async ({
  title,
  eventId,
}: createConversationServiceProps): Promise<Conversation> => {
  try {
    const conversationData: createConversationServiceProps = {
      title,
    };
    if (eventId) {
      conversationData.eventId = eventId;
    }
    const newConversationResponse = await prisma.conversation.create({
      data: conversationData,
    });
    return newConversationResponse;
  } catch (error) {
    console.error('createConversationService: error', error);
    throw new Error('Service error: createConversationService');
  }
};

export const deleteConversationService = async (
  conversationId: string
): Promise<void> => {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      select: { id: true },
    });
    const messageIds = messages.map((message) => message.id);

    await prisma.$transaction([
      prisma.messageStatus.deleteMany({
        where: { messageId: { in: messageIds } },
      }),
      prisma.message.deleteMany({
        where: { conversationId },
      }),
      prisma.userConversation.deleteMany({
        where: { conversationId },
      }),
      prisma.conversation.delete({
        where: { id: conversationId },
      }),
    ]);
  } catch (error) {
    console.error('deleteConversationService: error', error);
    throw new Error('Service error: deleteConversationService');
  }
};

export const getConversationByIdService = async (
  conversationId: string
): Promise<Conversation | null> => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                email: true,
                image: true,
                updatedAt: true,
              },
            },
          },
        },
        participants: {
          include: {
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

    return conversation;
  } catch (error) {
    console.error('getConversationByIdService: error', error);
    throw new Error('Service error: getConversationByIdService');
  }
};

// TODO : type response
export const selectConversationsByUserService = async (userId: string) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        event: {
          select: {
            id: true,
            title: true,
          },
        },
        messages: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            invitation: {
              select: {
                id: true,
                status: true,
                conversationId: true,
                eventId: true,
                createdAt: true,
                participantId: true,
                creatorId: true,
              },
            },
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
                userId,
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
            role: true,
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
    return conversations;
  } catch (error) {
    console.error('getConversationByUseService: error', error);
    return null;
  }
};
