'use server';

import { auth } from '@/lib/auth/authConfig';
import { deleteImage } from '../deleteImage';
import { deleteEventService } from '@/services/eventServices';

interface deleteEventProps {
  eventId: string;
  imagePath: string | null;
}
// TODO : ver si esto funciona o falta eliminar las conversaciones, userInvitations, userEvents
export const deleteEvent = async ({ eventId, imagePath }: deleteEventProps) => {
  const session = await auth();
  if (!session) {
    console.error('deleteEvent: no session found');
    return { error: 'no session found' };
  }
  // TODO: verificar si quien elimina el evento es el creador... o si es admin
  try {
    // delete image of the event
    if (imagePath) {
      await deleteImage(imagePath);
    }
    await deleteEventService(eventId);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};
