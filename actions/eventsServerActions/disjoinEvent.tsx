'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { EventWithUserAndCount } from '@/types/types';
import { sendMessageInConversation } from '../messagesServerActions/sendMessageInConversation';

interface DisjoinEventProps {
  event: EventWithUserAndCount;
  userId: string;
}

interface DisjoinEventResponse {
  ok: boolean;
}

/**
 * Allows a user to leave an event, updating their invitation status and removing them from related conversations.
 *
 * - Updates the **invitation status** to `'DISJOINED'`.
 * - Sends a message in the event conversation indicating that the user has left.
 * - Removes the user from the **event participants list**.
 * - Deletes the user's **conversation association** with the event.
 *
 * @param {DisjoinEventProps} params - The function parameters.
 * @param {EventWithUserAndCount} params.event - The event the user is leaving.
 * @param {string} params.userId - The unique ID of the user leaving the event.
 * @returns {Promise<DisjoinEventResponse>} - Returns `{ ok: true }` if successful, `{ ok: false }` otherwise.
 *
 * @throws {Error} If the user is not authenticated or required data is missing.
 */
export async function disjoinEvent({
  event,
  userId,
}: DisjoinEventProps): Promise<DisjoinEventResponse> {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('Vous devez être connecté pour accéder à cette page');
  }
  try {
    // Update the invitation status to "DISJOINED"
    await prisma.userInvitations.update({
      where: {
        participantId_eventId: { participantId: userId, eventId: event.id },
      },
      data: { status: 'DISJOINED' },
    });

    // Send a message to the event conversation
    const messageFormData = new FormData();
    messageFormData.set('message', 'A quitté la conversation');
    messageFormData.set('conversationId', event.conversation?.id as string);
    await sendMessageInConversation(messageFormData);

    // Remove the user from the event participants list
    await prisma.userEvents.delete({
      where: {
        userId_eventId: { userId, eventId: event.id },
      },
    });

    // Remove the user from the event conversation
    await prisma.userConversation.delete({
      where: {
        userId_conversationId: {
          userId,
          conversationId: event.conversation?.id as string,
        },
      },
    });

    return { ok: true };
  } catch (error) {
    console.error('disjoinEvent: error', error);
    return { ok: false };
  }
}
