import prisma from '@/lib/prisma';
import { createMessageServiceProps } from '@/types/servicesTypes/types';
import { Message } from '@prisma/client';

export const createMessageService = async ({
  content,
  conversationId,
  invitationId,
  senderId,
}: createMessageServiceProps): Promise<Message> => {
  const data: createMessageServiceProps = {
    content,
    conversationId,
    senderId,
  };
  if (invitationId) {
    data.invitationId = invitationId;
  }
  try {
    const newMessage = await prisma.message.create({ data });
    return newMessage;
  } catch (error) {
    console.error('createMessageService: error', error);
    throw new Error('Service error: createMessageService');
  }
};

export const deleteMessagesOfConversationService = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  try {
    await prisma.message.deleteMany({
      where: {
        conversationId,
      },
    });
    return true;
  } catch (error) {
    console.error('deleteMessagesOfConversationService: error', error);
    throw new Error('Service error: deleteMessagesOfConversationService');
  }
};
