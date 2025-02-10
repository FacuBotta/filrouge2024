'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
// import { revalidatePath } from 'next/cache';

/**
 * Send a message in a existing conversation
 * formData should contain the following fields:
 * - conversationId (string)
 * - message (string)
 * - invitationId (string) is optional
 * @param formData
 * @returns
 */
export async function sendMessageInConversation(formData: FormData) {
  try {
    const { user: sender } = (await auth()) || {};
    if (!sender) {
      console.error('sendMessageInConversation: no sender found');
      return;
    }
    const conversationId = formData.get('conversationId') as string;
    const message = formData.get('message') as string;
    const invitationId = (formData.get('invitationId') as string) || null;
    if (!message || !conversationId) {
      console.error('Incomplete form data');
      return;
    }
    // send the message
    const newMessage = await prisma.message.create({
      data: {
        conversationId,
        senderId: sender.id as string,
        content: message,
        invitationId: invitationId || null,
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
