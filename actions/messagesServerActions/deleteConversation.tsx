'use server';

import { auth } from '@/lib/auth/authConfig';
import { deleteConversationService } from '@/services/conversationServices';
import { selectConversationService } from '@/services/userConversationServices';

interface DeleteConversationResponse {
  ok: boolean;
  message: string;
}

/**
 * Deletes a conversation and all its related data.
 *
 * - Ensures the user is authenticated.
 * - Verifies that the user is the **creator** of the conversation.
 * - Deletes all related data, including:
 *   - **Message statuses** (`messageStatus`)
 *   - **Messages** (`messages`)
 *   - **User-conversation associations** (`userConversation`)
 *   - **The conversation itself** (`conversation`)
 * - Triggers cache revalidation for the messages page.
 *
 * @param {string} conversationId - The unique ID of the conversation to delete.
 * @returns {Promise<DeleteConversationResponse>} - Returns `{ ok: true }` if successful, `{ ok: false }` otherwise.
 *
 * @throws {Error} If the user is not authenticated or is not the conversation creator.
 */
export async function deleteConversation(
  conversationId: string
): Promise<DeleteConversationResponse> {
  const { user } = (await auth()) || {};

  if (!user) {
    console.error('deleteConversation: No user found');
    throw new Error('User not found');
  }

  // Check if the user is the creator of the conversation
  const userConversation = await selectConversationService({
    conversationId,
    userId: user.id,
  });

  if (!userConversation || userConversation.role !== 'CREATOR') {
    return {
      ok: false,
      message: 'Il faut être créateur de la conversation',
    };
  }

  try {
    await deleteConversationService(conversationId);
    return { ok: true, message: 'Conversation supprimée' };
  } catch (error) {
    console.error('deleteConversation: Error deleting conversation', error);
    return {
      ok: false,
      message: 'Une erreur est survenue',
    };
  }
}
