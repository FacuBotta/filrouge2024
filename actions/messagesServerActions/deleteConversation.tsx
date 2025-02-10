'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface DeleteConversationResponse {
  ok: boolean;
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
  const userRoleInConversation = await prisma.userConversation.findUnique({
    where: {
      userId_conversationId: {
        userId: user.id as string,
        conversationId,
      },
    },
  });

  if (!userRoleInConversation || userRoleInConversation.role !== 'CREATOR') {
    console.error('deleteConversation: User is not the creator');
    return {
      ok: false,
    };
  }

  try {
    // Fetch all message IDs related to the conversation
    const messages = await prisma.message.findMany({
      where: { conversationId },
      select: { id: true },
    });
    const messageIds = messages.map((message) => message.id);

    // Delete all related data in a transaction
    await prisma.$transaction([
      // Delete related message statuses
      prisma.messageStatus.deleteMany({
        where: { messageId: { in: messageIds } },
      }),
      // Delete messages
      prisma.message.deleteMany({
        where: { conversationId },
      }),
      // Delete user conversations
      prisma.userConversation.deleteMany({
        where: { conversationId },
      }),
      // Delete the conversation itself
      prisma.conversation.delete({
        where: { id: conversationId },
      }),
    ]);

    // Revalidate the messages page cache
    revalidatePath('/messages');

    return { ok: true };
  } catch (error) {
    console.error('deleteConversation: Error deleting conversation', error);
    return { ok: false };
  }
}
