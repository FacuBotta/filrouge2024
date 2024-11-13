'use server';

import { newEventSchema } from '@/lib/zodSchemas';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth/authConfig';
import { Events } from '@prisma/client';
export const createEvent = async (event: any) => {
  const session = await auth();
  if (!session) {
    throw new Error('Vous devez être connecté pour créer un événement');
  }
  type NewEvent = Omit<Events, 'id' | 'createdAt' | 'updatedAt'>;
  try {
    newEventSchema.parse(event);
    const newEvent: NewEvent = {
      title: event.title,
      categoryId: event.categoryId, // Cambiado a `categoryId`
      // isPublic: event.isPublic, // TODO: agregar campo en la base de datos
      eventStart: new Date(event.eventStart),
      eventEnd: new Date(event.eventEnd),
      description: event.description,
      userId: session?.user?.id as string,
      // No incluimos `participants`, `createdAt`, `updatedAt` ni otros campos opcionales
    };
    console.log(newEvent);
    await prisma.events.create({
      data: newEvent,
    });
    return { ok: true, message: 'Événement créé avec succès' };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
