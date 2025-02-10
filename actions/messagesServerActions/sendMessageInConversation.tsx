'use server';

import { auth } from '@/lib/auth/authConfig';
import { createMessageService } from '@/services/messagesServices';
import { createMessageStatusService } from '@/services/messagesStatusServices';
import { getConversationParticipantsService } from '@/services/userConversationServices';
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

interface sendMessageInConversationProps {
  conversationId: string;
  message: string;
  invitationId: string | null;
}

export async function sendMessageInConversation({
  conversationId,
  message,
  invitationId,
}: sendMessageInConversationProps) {
  try {
    const { user: sender } = (await auth()) || {};
    if (!sender) {
      console.error('sendMessageInConversation: no sender found');
      return;
    }
    if (!message || !conversationId) {
      console.error('Incomplete form data');
      return;
    }
    // send the message
    const newMessage = await createMessageService({
      content: message,
      conversationId,
      invitationId,
      senderId: sender.id as string,
    });
    // get the participants of the conversation
    // to set the messageStatus for each participant
    const participants =
      await getConversationParticipantsService(conversationId);
    console.log(participants);
    for (const participant of participants) {
      await createMessageStatusService({
        userId: participant.id,
        messageId: newMessage.id,
        status: 'UNSEEN',
      });
    }

    // revalidatePath('/Messages');
    return { ok: true, message: '' };
  } catch (error) {
    console.error('Error sending message:', error);
    return { ok: false, message: error };
  }
}
