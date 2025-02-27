'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { NewEventForm } from '@/lib/zod/zodSchemas';
import { updateEventService } from '@/services/eventServices';
import { createEventServiceProps } from '@/types/servicesTypes/types';
import { deleteImage } from '../deleteImage';
import { uploadImage } from '../uploadImage';

interface UpdateEventProps {
  eventData: NewEventForm;
  eventId: string;
}

export const updateEvent = async ({ eventData, eventId }: UpdateEventProps) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Vous devez être connecté pour créer un événement');
  }
  try {
    // check if the event exists
    const event = await prisma.events.findFirst({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      throw new Error("L'événement n'existe pas");
    }

    const parsedEventData: createEventServiceProps = {
      userId: session.user.id,
      categoryId: eventData.categoryId,
      title: eventData.title,
      description: eventData.description,
      eventStart: eventData.eventStart,
      eventEnd: eventData.eventEnd,
      isPublic: eventData.isPublic,
      image: event.image as string,
      locationUrl: eventData.address?.url,
      lat: eventData.address?.lat,
      lng: eventData.address?.lng,
      vicinity: eventData.address?.vicinity,
      formattedAddress: eventData.address?.formattedAddress,
    };
    // check if the image was uploaded
    if (eventData.image.type === 'image/jpeg' && eventData.image.size > 0) {
      const imageFile = eventData.image as File;
      // upload the new image

      const { imagePath } = await uploadImage(imageFile, eventData.title);
      if (!imagePath) {
        throw new Error("Erreur lors du téléchargement de l'image");
      }
      // delete the old image
      await deleteImage(event.image as string);
      parsedEventData.image = imagePath;
    }
    await updateEventService(parsedEventData, eventId);
    return { ok: true, message: 'Événement mis à jour avec succès' };
  } catch (error) {
    console.error('updateEvent: Error updating event', error);
    return {
      ok: false,
      message: "Erreur lors de la modification de l'événement",
    };
  }
};
