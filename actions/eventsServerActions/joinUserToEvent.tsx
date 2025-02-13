'use server';

import { auth } from '@/lib/auth/authConfig';
import { selectEventByIdService } from '@/services/eventServices';
import { createUserConversationService } from '@/services/userConversationServices';
import {
  createUserInvitationService,
  updateUserInvitationService,
} from '@/services/userInvitationServices';
import { sendMessageInConversation } from '../messagesServerActions/sendMessageInConversation';

/**
 * Adds the authenticated user to an event.
 *
 * - Checks if the user is authenticated.
 * - Creates an entry in the `userEvents` table to associate the user with the event.
 *
 * @param {string} eventId - The ID of the event to join.
 * @returns {Promise<{ ok: boolean }>} - Returns `{ ok: true }` if the operation is successful, `{ ok: false }` otherwise.
 *
 * @throws {Error} If the user is not authenticated or `eventId` is missing.
 */

interface SendInvitationToEventResponse {
  ok: boolean;
  message: string;
}
interface SendInvitationToEventProps {
  eventId: string;
  participantsIds: string[];
}

export const sendInvitationToEvent = async ({
  eventId,
  participantsIds,
}: SendInvitationToEventProps): Promise<SendInvitationToEventResponse> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id || !eventId) {
      throw new Error('No session found or missing data');
    }
    // Check if event exists
    const event = await selectEventByIdService(eventId);
    if (!event || event.id !== eventId || !event.conversation) {
      throw new Error("L'événement n'existe pas");
    }

    // Check if the users have a userInvitation objet
    // it means that the user has already been invited to the event, maybe with a status of DECLINED_BY_CREATOR or DECLINED_BY_PARTICIPANT
    const existingUserInvitations = participantsIds.map((participantId) => {
      return event.UserInvitations?.find(
        (invitation) => invitation.participantId === participantId
      );
    });
    // remove participants with previous invitations to send a new invitation for them
    const usersToInvite = participantsIds.filter(
      (participantId) =>
        !existingUserInvitations.find(
          (invitation) => invitation?.participantId === participantId
        )
    );

    // Add the users to the event
    const newUserInvitations = await Promise.all(
      usersToInvite.map(async (participantId) => {
        return createUserInvitationService({
          creatorId: session.user?.id as string,
          participantId,
          eventId,
          status: 'WAITING_PARTICIPANT_RESPONSE',
          conversationId: event.conversation?.id as string,
        });
      })
    );
    // add all participants to the event conversation
    await Promise.all(
      participantsIds.map(async (participantId) => {
        return createUserConversationService({
          userId: participantId,
          conversationId: event.conversation?.id as string,
          role: 'GUEST',
        });
      })
    );
    // Send messages for each new invitation
    await Promise.all(
      newUserInvitations.map((invitation) =>
        sendMessageInConversation({
          conversationId: event.conversation?.id as string,
          invitationId: invitation.id,
          message: `Bonjour, je vous invite à mon nouvel événement ${event.title} !`,
        })
      )
    );
    // Update the status of the existing userInvitation to WAITING_PARTICIPANT_RESPONSE
    if (existingUserInvitations && existingUserInvitations.length > 0) {
      await Promise.all(
        existingUserInvitations.map(async (invitation) => {
          if (invitation?.participantId) {
            await updateUserInvitationService({
              eventId,
              participantId: invitation.participantId,
              status: 'WAITING_PARTICIPANT_RESPONSE',
            });
          }
        })
      );
      // Send messages for each old UserInvitation
      await Promise.all(
        existingUserInvitations.map(async (invitation) => {
          if (invitation?.id) {
            await sendMessageInConversation({
              conversationId: event.conversation?.id as string,
              invitationId: invitation.id,
              message: `Bonjour, je vous invite à mon nouvel événement ${event.title} !`,
            });
          }
        })
      );
    }

    return { ok: true, message: 'Invitation envoyée' };
  } catch (error) {
    console.error('sendInvitationToEvent: error', error);
    return { ok: false, message: 'Une erreur est survenue' };
  }
};
