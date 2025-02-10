import prisma from '@/lib/prisma';
import { Status } from '@prisma/client';

export const createMessageStatusService = async ({
  userId,
  messageId,
  status,
}: {
  userId: string;
  messageId: string;
  status: Status;
}) => {
  try {
    const newMessageStatus = await prisma.messageStatus.create({
      data: {
        userId,
        messageId,
        status,
      },
    });
    return newMessageStatus;
  } catch (error) {
    console.error('createMessageStatusService: error', error);
    throw new Error('Service error: createMessageStatusService');
  }
};

export const selectUnseenMessagesService = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const unseenMessages = await prisma.messageStatus.findMany({
      where: {
        userId,
        status: 'UNSEEN',
      },
    });
    return unseenMessages;
  } catch (error) {
    console.error('selectUnseenMessagesService: error', error);
    throw new Error('Service error: selectUnseenMessagesService');
  }
};

export const updateMessageStatusService = async ({
  userId,
  conversationId,
}: {
  userId: string;
  conversationId: string;
}) => {
  try {
    await prisma.messageStatus.updateMany({
      where: {
        userId,
        message: {
          conversationId,
        },
        status: 'UNSEEN',
      },
      data: {
        status: 'SEEN',
      },
    });
  } catch (error) {
    console.error('updateMessageStatusService: error', error);
    throw new Error('Service error: updateMessageStatusService');
  }
};
