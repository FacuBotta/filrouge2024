'use server';

import { auth } from '@/lib/auth/authConfig';
import { createMessageService } from '@/services/messagesServices';
import { createMessageStatusService } from '@/services/messagesStatusServices';
import { getConversationParticipantsService } from '@/services/userConversationServices';
/**
 * Sends a message in an existing conversation.
 *
 * @param {Object} params - The message parameters.
 * @param {string} params.conversationId - The ID of the conversation.
 * @param {string} params.message - The message content.
 * @param {string | null} params.invitationId - (Optional) The invitation ID associated with the message.
 * @returns {Promise<{ ok: boolean; message: string }>} - A response indicating success or failure.
 *
 * @throws {Error} Throws an error if the user is not authenticated or if the message creation fails.
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
      return { ok: false, message: 'User not authenticated' };
    }
    if (!message || !conversationId) {
      console.error('Incomplete form data');
      return { ok: false, message: 'Missing required fields' };
    }

    const newMessage = await createMessageService({
      content: message,
      conversationId,
      invitationId,
      senderId: sender.id as string,
    });

    if (!newMessage || !newMessage.id) {
      console.error('Failed to create message');
      return { ok: false, message: 'Error creating message' };
    }

    const participants =
      await getConversationParticipantsService(conversationId);
    await Promise.all(
      participants
        .filter(({ userId }) => userId !== sender.id)
        .map(({ userId }) =>
          createMessageStatusService({
            userId,
            messageId: newMessage.id,
            status: 'UNSEEN',
          })
        )
    );

    return { ok: true, message: 'Message sent' };
  } catch (error) {
    console.error('Error sending message:', error);
    return { ok: false, message: 'Internal server error' };
  }
}
