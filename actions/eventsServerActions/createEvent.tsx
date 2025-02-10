'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { NewEventForm, newEventSchema } from '@/lib/zodSchemas';
import { createConversation } from '../messagesServerActions/createConversation';
import { uploadImage } from '../uploadImage';

interface CreateEventResponse {
  ok: boolean;
}

/**
 * Creates a new event and sets up a conversation for it.
 *
 * - **Validates event data** using Zod.
 * - **Uploads the event image** and generates a unique filename.
 * - **Saves the event to the database** with the given details.
 * - **Creates a conversation** linked to the event.
 * - **Sends invitations** to participants if provided.
 *
 * @param {NewEventForm} event - The event details provided by the user.
 * @returns {Promise<CreateEventResponse>} - Returns `{ ok: true }` if successful, or `{ ok: false, message: string }` if an error occurs.
 *
 * @throws {Error} If the user is not authenticated or event data is invalid.
 */
export const createEvent = async (
  event: NewEventForm
): Promise<CreateEventResponse> => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Vous devez être connecté pour créer un événement');
  }

  try {
    /* 
    ============= VALIDATE EVENT DATA =============
    */
    newEventSchema.parse(event);

    const imageFile = event.image as File;
    if (!imageFile) {
      throw new Error("Aucun fichier d'image n'a été sélectionné");
    }

    /* 
    ============= UPLOAD IMAGE =============
    */
    const safeTitle = event.title.replace(/[^a-zA-Z0-9-_]/g, '_');
    const imageName = `${safeTitle}_${Date.now()}.jpg`;
    const imagePath = `/uploads/${imageName}`;

    const success = await uploadImage(imageFile, imageName);
    if (!success) {
      throw new Error("Erreur lors du téléchargement de l'image");
    }

    /* 
    ============= CREATE EVENT =============
    */
    const newEvent = {
      userId: session.user.id,
      categoryId: event.categoryId,
      title: event.title,
      description: event.description,
      eventStart: event.eventStart,
      eventEnd: event.eventEnd,
      isPublic: event.isPublic,
      image: imagePath,
      locationUrl: event.address?.url,
      lat: event.address?.lat,
      lng: event.address?.lng,
      vicinity: event.address?.vicinity,
      formattedAddress: event.address?.formattedAddress,
    };

    const newEventResponse = await prisma.events.create({
      data: newEvent,
    });

    /* 
    ============= CREATE CONVERSATION =============
    */
    const conversationFormData = new FormData();
    conversationFormData.set('sujet', event.title);
    conversationFormData.set('eventId', newEventResponse.id);

    if (event.participants) {
      event.participants.split(',').forEach((id) => {
        conversationFormData.append('participantsId', id);
      });
    }

    const conversationResponse = await createConversation(conversationFormData);

    if (!event.participants) {
      return { ok: true };
    }

    /* 
    ============= SEND INVITATIONS =============
    */
    if (conversationResponse?.ok && conversationResponse.conversation) {
      const conversationId = conversationResponse.conversation.id;

      const userInvitationsArray = await Promise.all(
        event.participants.split(',').map(async (participantId) => {
          return prisma.userInvitations.create({
            data: {
              creatorId: session.user?.id as string,
              participantId,
              eventId: newEventResponse.id,
              status: 'WAITING_PARTICIPANT_RESPONSE',
              conversationId,
            },
          });
        })
      );

      // Send messages for each invitation
      await Promise.all(
        userInvitationsArray.map((invitation) =>
          prisma.message.create({
            data: {
              conversationId,
              invitationId: invitation.id,
              senderId: session.user?.id as string,
              content: `Bonjour, je vous invite à mon nouvel événement ${event.title} !`,
            },
          })
        )
      );
    }

    return { ok: true };
  } catch (error) {
    console.error('createEvent: Error creating event', error);
    return { ok: false };
  }
};
