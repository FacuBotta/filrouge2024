'use server';

import { auth } from '@/lib/auth/authConfig';
import { createUserEventService } from '@/services/userEventServices';
import { updateUserInvitationService } from '@/services/userInvitationServices';

interface acceptEventInvitationProps {
  userInvitationId: string;
  participantId: string;
  eventId: string;
}
interface AcceptEventInvitationResponse {
  ok: boolean;
  message: string;
}
/**
 * Accepts an event invitation, allowing a user to join as a participant.
 *
 * - This function verifies the user's authentication.
 * - Updates the invitation status in the database.
 * - Ensures the participant is associated with the event.
 *
 * @param {string} param.userInvitationId - The unique ID of the event invitation.
 * @param {string} param.participantId - The unique ID of the participant accepting the invitation.
 * @param {string} param.eventId - The unique ID of the event being joined.
 * @returns {Promise<AcceptEventInvitationResponse>} - Returns an object indicating success or failure, or undefined if an error occurs.
 *
 * @throws {Error} If authentication fails, parameters are missing, or the database operation encounters an error.
 */

export const acceptEventInvitation = async ({
  userInvitationId,
  participantId,
  eventId,
}: acceptEventInvitationProps): Promise<
  AcceptEventInvitationResponse | undefined
> => {
  const session = await auth();
  if (!session?.user?.id || !participantId || !eventId || !userInvitationId) {
    throw new Error('No session found');
  }
  try {
    // attach the user to the event
    await createUserEventService({ userId: participantId, eventId });
    // update the invitation status

    // TODO : this can be useful to make statistics of the sended invitations for any event...
    await updateUserInvitationService({
      participantId,
      eventId,
      status: 'JOINED',
    });

    return { ok: true, message: 'Invitation acceptée' };
  } catch (error) {
    console.error('acceptEventInvitationAction: error', error);
    return {
      ok: false,
      message: "Erreur lors de l'acceptation de l'invitation",
    };
  }
};
