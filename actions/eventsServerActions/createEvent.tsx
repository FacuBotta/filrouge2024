'use server';

import { auth } from '@/lib/auth/authConfig';
import { NewEventForm, newEventSchema } from '@/lib/zodSchemas';

export const createEvent = async (event: NewEventForm) => {
  const session = await auth();
  if (!session) {
    throw new Error('Vous devez être connecté pour créer un événement');
  }
  try {
    newEventSchema.parse(event);

    const imageFile = event.image as File;
    // generate a name and path for the image
    const imageName = `${event.title}_${session.user?.id}.jpg`;
    const imagePath = `/images/events/${imageName}`;

    // parse event data
    const newEvent = {
      title: event.title,
      categoryId: event.categoryId,
      isPublic: event.isPublic,
      eventStart: event.eventStart,
      eventEnd: event.eventEnd || null,
      description: event.description,
      userId: session?.user?.id as string,
      address: event.address,
      image: imagePath,
    };
    console.log(newEvent);
    /* await prisma.events.create({
      data: newEvent,
    }); */
    return { ok: true, message: 'Événement créé avec succès' };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
