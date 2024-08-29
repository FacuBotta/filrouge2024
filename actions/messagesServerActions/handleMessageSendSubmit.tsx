'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// TODO: luego sera necesario enviar solicitud de mensaje cuando no este establecida la conversacion.

export async function handleMessageSendSubmit(formData: FormData) {
  const { user: sender } = (await auth()) || {};
  if (!sender) {
    console.error('handleMessageSendSubmit: no sender found');
    return;
  }
  const recipientId = formData.get('userRecipientId') as string;
  const sujet = formData.get('sujet') as string;
  const message = formData.get('message') as string;

  if (!recipientId || !sujet || !message) {
    console.error('Incomplete form data:', { recipientId, sujet, message });
    return;
  }

  // check if a conversation already exists
  let conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          participants: {
            some: { userId: sender.id },
          },
        },
        {
          participants: {
            some: { userId: recipientId },
          },
        },
      ],
    },
  });
  if (!conversation) {
    // create a new conversation
    conversation = await prisma.conversation.create({
      data: {
        title: sujet,
        participants: {
          create: [
            {
              userId: sender.id as string,
            },
            {
              userId: recipientId,
            },
          ],
        },
      },
    });
    console.log('New conversation created:', conversation);
  }
  // check if the sender and recipient are participants in the conversation
  const senderIsParticipant = await prisma.userConversation.findUnique({
    where: {
      userId_conversationId: {
        userId: sender.id as string,
        conversationId: conversation.id,
      },
    },
  });
  if (!senderIsParticipant) {
    await prisma.userConversation.create({
      data: {
        userId: sender.id as string,
        conversationId: conversation.id,
      },
    });
  }
  const recipientIsParticipant = await prisma.userConversation.findUnique({
    where: {
      userId_conversationId: {
        userId: recipientId,
        conversationId: conversation.id,
      },
    },
  });
  if (!recipientIsParticipant) {
    await prisma.userConversation.create({
      data: {
        userId: recipientId,
        conversationId: conversation.id,
      },
    });
  }
  // create the message
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: sender.id as string,
      content: message,
    },
  });
  revalidatePath('/Dashboard');
}
