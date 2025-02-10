'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { Invitation } from '@/types/types';
import { sendMessageInConversation } from '../messagesServerActions/sendMessageInConversation';

interface JoinEventRequestResponse {
  ok: boolean;
}

export interface JoinEventRequestProps {
  existingInvitationId?: string;
  eventId: string;
  eventCreatorId: string;
  conversationId: string;
}

/**
 * Handles a user's request to join an event.
 *
 * - If an existing invitation is found, updates its status to "WAITING_CREATOR_RESPONSE".
 * - If no invitation exists, creates a new one with the same status.
 * - Associates the user with the event's conversation as a "GUEST".
 * - Sends a message in the event conversation to notify the creator.
 *
 * @param {JoinEventRequestProps} params - The details required for the join request.
 * @param {string} params.existingInvitationId - (Optional) ID of an existing invitation.
 * @param {string} params.eventId - The ID of the event the user wants to join.
 * @param {string} params.eventCreatorId - The ID of the event's creator.
 * @param {string} params.conversationId - The ID of the conversation linked to the event.
 * @returns {Promise<JoinEventRequestResponse>} - Returns `{ ok: true }` if successful, `{ ok: false }` if an error occurs.
 *
 * @throws {Error} If the user is not authenticated or required data is missing.
 */
export async function joinEventRequest({
  existingInvitationId,
  eventId,
  conversationId,
  eventCreatorId,
}: JoinEventRequestProps): Promise<JoinEventRequestResponse> {
  const session = await auth();
  if (!session?.user?.id || !eventId || !conversationId || !eventCreatorId) {
    throw new Error('No session found or missing data');
  }

  try {
    /* 
    ============= HANDLE INVITATION =============
    */
    let userInvitation: Invitation | null = null;

    if (existingInvitationId) {
      userInvitation = await prisma.userInvitations.update({
        where: {
          participantId_eventId: {
            participantId: session.user.id as string,
            eventId,
          },
        },
        data: {
          status: 'WAITING_CREATOR_RESPONSE',
        },
      });
    } else {
      userInvitation = await prisma.userInvitations.create({
        data: {
          creatorId: eventCreatorId,
          participantId: session.user.id as string,
          eventId,
          conversationId,
          status: 'WAITING_CREATOR_RESPONSE',
        },
      });
    }

    /* 
    ============= ASSOCIATE USER WITH CONVERSATION =============
    */
    await prisma.userConversation.create({
      data: {
        userId: session.user.id,
        conversationId,
        role: 'GUEST',
      },
    });

    /* 
    ============= SEND MESSAGE TO EVENT CONVERSATION =============
    */
    const messageFormData = new FormData();
    messageFormData.set('message', 'Je voudrais participer à l’événement !');
    messageFormData.set('conversationId', conversationId);
    messageFormData.set('invitationId', userInvitation.id);

    await sendMessageInConversation(messageFormData);

    return { ok: true };
  } catch (error) {
    console.error('joinEventRequest: error', error);
    return { ok: false };
  }
}
