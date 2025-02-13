'use server';

import { auth } from '@/lib/auth/authConfig';
import { createMessageService } from '@/services/messagesServices';
import { deleteUserConversationService } from '@/services/userConversationServices';
import { updateUserInvitationService } from '@/services/userInvitationServices';
import { Invitation } from '@/types/types';

interface DeclineEventInvitationProps {
  decliner: 'CREATOR' | 'PARTICIPANT';
  userInvitation: Invitation;
}

interface DeclineEventInvitationResponse {
  ok: boolean;
  message: string;
}

/**
 * Declines an event invitation, updating its status accordingly.
 *
 * - If the **creator** declines, the invitation status is set to `DECLINED_BY_CREATOR`.
 * - If the **participant** declines, the invitation status is set to `DECLINED_BY_PARTICIPANT`.
 * - A message is sent to notify the event creator.
 *
 * @param {DeclineEventInvitationProps} params - The function parameters.
 * @param {'CREATOR' | 'PARTICIPANT'} params.decliner - Indicates who is declining the invitation.
 * @param {Invitation} params.userInvitation - The invitation details, including IDs for the event and conversation.
 * @returns {Promise<DeclineEventInvitationResponse>} - Returns an object `{ ok: true }` if successful, or `{ ok: false }` in case of an error.
 *
 * @throws {Error} If the user is not authenticated or required data is missing.
 */
export const declineEventInvitation = async ({
  decliner,
  userInvitation,
}: DeclineEventInvitationProps): Promise<DeclineEventInvitationResponse> => {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('Vous devez être connecté pour accéder à cette page');
  }
  if (!userInvitation || !userInvitation.id || !userInvitation.conversationId) {
    throw new Error('Données manquantes');
  }

  const newStatusValue =
    decliner === 'CREATOR' ? 'DECLINED_BY_CREATOR' : 'DECLINED_BY_PARTICIPANT';

  try {
    // Update the invitation status in the database
    await updateUserInvitationService({
      participantId: userInvitation.participantId,
      eventId: userInvitation.eventId,
      status: newStatusValue,
    });

    // Send a notification message in the event conversation
    const senderId =
      decliner === 'CREATOR'
        ? userInvitation.creatorId
        : userInvitation.participantId;
    console.log({
      datos: userInvitation.id,
      senderId,
      userInvitation,
      decliner,
    });
    await createMessageService({
      content: 'Invitation refusée',
      conversationId: userInvitation.conversationId,
      invitationId: userInvitation.id,
      senderId,
    });

    // remove the user from the event conversation
    await deleteUserConversationService({
      userId: userInvitation.participantId,
      conversationId: userInvitation.conversationId,
    });

    return { ok: true, message: 'Invitation refusée' };
  } catch (error) {
    console.error('declineEventInvitation: Error processing request', error);
    return { ok: false, message: 'Une erreur est survenue' };
  }
};
