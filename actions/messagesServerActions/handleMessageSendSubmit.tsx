'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// TODO: luego sera necesario enviar solicitud de mensaje cuando no este establecida la conversacion.

export async function handleMessageSendSubmit(formData: FormData) {
  try {
    const { user: sender } = (await auth()) || {};
    if (!sender) {
      console.error('handleMessageSendSubmit: no sender found');
      return;
    }
    const conversationId = formData.get('conversationId') as string;
    const message = formData.get('message') as string;

    if (!message) {
      console.error('Incomplete form data:', { sender, message });
      return;
    }
    // check if the sender is participant in the conversation
    const senderIsParticipant = await prisma.userConversation.findUnique({
      where: {
        userId_conversationId: {
          userId: sender.id as string,
          conversationId,
        },
      },
    });
    if (!senderIsParticipant) {
      console.error('handleMessageSendSubmit: sender is not participant');
      return;
    }
    // send the message
    const newMessage = await prisma.message.create({
      data: {
        conversationId,
        senderId: sender.id as string,
        content: message,
      },
    });

    // get the participants of the conversation
    // to set the messageStatus for each participant
    const participants = await prisma.userConversation.findMany({
      where: { conversationId },
    });
    for (const participant of participants) {
      await prisma.messageStatus.create({
        data: {
          userId: participant.userId,
          messageId: newMessage.id,
          status: 'UNSEEN',
        },
      });
    }

    revalidatePath('/Messages');
    return { ok: true, message: '' };
  } catch (error) {
    console.error('Error sending message:', error);
    return { ok: false, message: error };
  }
}
