import prisma from '@/lib/prisma';
import { Role, UserConversation } from '@prisma/client';

export const createUserConversationService = async ({
  userId,
  conversationId,
  role,
}: {
  userId: string;
  conversationId: string;
  role: Role;
}): Promise<UserConversation> => {
  try {
    const userConversation = await prisma.userConversation.create({
      data: {
        userId,
        conversationId,
        role,
      },
    });
    return userConversation;
  } catch (error) {
    console.error('createUserConversationService: error', error);
    throw new Error('Service error: createUserConversationService');
  }
};

export const deleteUserConversationService = async ({
  userId,
  conversationId,
}: {
  userId: string;
  conversationId: string;
}) => {
  try {
    await prisma.userConversation.delete({
      where: {
        userId_conversationId: { userId, conversationId },
      },
    });
    return true;
  } catch (error) {
    console.error('deleteUserConversationService: error', error);
    throw new Error('Service error: deleteUserConversationService');
  }
};
export const deleteManyUserConversationService = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  try {
    await prisma.userConversation.deleteMany({
      where: {
        conversationId,
      },
    });
    return true;
  } catch (error) {
    console.error('deleteManyUserConversationService: error', error);
    throw new Error('Service error: deleteManyUserConversationService');
  }
};

// TODO: change many to first. see prisma schema...
export const getConversationParticipantsService = async (
  conversationId: string
) => {
  try {
    const participants = await prisma.userConversation.findMany({
      where: { conversationId },
      select: {
        userId: true,
      },
    });
    return participants;
  } catch (error) {
    console.error('getConversationService: error', error);
    throw new Error('Service error: getConversationService');
  }
};

export const selectConversationService = async ({
  conversationId,
  userId,
}: {
  conversationId: string;
  userId: string;
}): Promise<UserConversation | null> => {
  try {
    const conversation: UserConversation | null =
      await prisma.userConversation.findUnique({
        where: {
          userId_conversationId: {
            userId,
            conversationId,
          },
        },
      });
    return conversation;
  } catch (error) {
    console.error('selectConversationService: error', error);
    throw new Error('Service error: selectConversationService');
  }
};
