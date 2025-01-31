'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { NewEventForm, newEventSchema } from '@/lib/zodSchemas';
import { createConversation } from '../messagesServerActions/handleNewConversationSubmit';
import { uploadImage } from '../uploadImage';

export const createEvent = async (event: NewEventForm) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Vous devez être connecté pour créer un événement');
  }
  try {
    newEventSchema.parse(event);

    const imageFile = event.image as File;
    if (!imageFile) {
      throw new Error("Aucun fichier d'image n'a été sélectionné");
    }
    // generate a name and path for the image
    const imageName = `${event.title}_${session.user?.id}.jpg`;
    const imagePath = `/images/uploads/${imageName}`;
    // upload the image to the server
    const { success } = await uploadImage(imageFile, imageName);
    if (!success) {
      throw new Error("Erreur lors du téléchargement de l'image");
    }
    // parse event data
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
    console.log(newEvent);
    const newEventResponse = await prisma.events.create({
      data: newEvent,
    });
    if (event.participants.length === 0) {
      return {
        ok: true,
        message: 'Aucun participant n&apos;a été sélectionné',
      };
    }
    // If the event has be created so create the user-event association in the DB for all participants
    const participantsIdArray = event.participants.split(',');
    const userEventArray = participantsIdArray.map((id) => {
      return { userId: id, eventId: newEventResponse.id };
    });
    await prisma.userEvents.createMany({
      data: userEventArray,
    });
    // create conversation
    const conversationFormData = new FormData();
    conversationFormData.set('sujet', event.title);
    participantsIdArray.forEach((id) => {
      conversationFormData.append('participantsId', id);
    });

    const conversationResponse = await createConversation(conversationFormData);

    if (conversationResponse?.ok && conversationResponse.conversation) {
      const conversationId = conversationResponse.conversation.id;

      await prisma.message.create({
        data: {
          conversationId, // Cambié la clave a conversationId
          senderId: session.user.id,
          content: `Bonjour, nous sommes ravi·es de vous annoncer que vous êtes invité·e à l'événement : ${event.title} !`,
        },
      });
    }
    return { ok: true, message: 'Événement créé avec succès' };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
