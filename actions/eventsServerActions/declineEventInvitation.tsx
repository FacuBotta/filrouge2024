'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { Invitation } from '@/types/types';

interface DeclineEventInvitationProps {
  decliner: 'CREATOR' | 'PARTICIPANT';
  userInvitation: Invitation;
}

interface DeclineEventInvitationResponse {
  ok: boolean;
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
  if (!userInvitation) {
    throw new Error('Données manquantes');
  }

  const statusValue =
    decliner === 'CREATOR' ? 'DECLINED_BY_CREATOR' : 'DECLINED_BY_PARTICIPANT';

  try {
    // Update the invitation status in the database
    await prisma.userInvitations.update({
      where: { id: userInvitation.id },
      data: { status: statusValue },
    });

    // Send a notification message in the event conversation
    // TODO : poner la funcion de send message
    await prisma.message.create({
      data: {
        conversationId: userInvitation.conversationId,
        senderId: userInvitation.participantId,
        content: 'Invitation refusée',
      },
    });

    return { ok: true };
  } catch (error) {
    console.error('declineEventInvitation: Error processing request', error);
    return { ok: false };
  }
};
