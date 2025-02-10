'use server';

import { auth } from '@/lib/auth/authConfig';
import { deleteConversationService } from '@/services/conversationServices';
import {
  deleteEventService,
  selectEventByIdService,
} from '@/services/eventServices';
import { deleteImage } from '../deleteImage';
import { deleteUserTask } from '../TasksServerActions/deleteUserTask';

interface deleteEventProps {
  eventId: string;
}
// TODO : ver si esto funciona o falta eliminar las conversaciones, userInvitations, userEvents
export const deleteEvent = async ({ eventId }: deleteEventProps) => {
  const session = await auth();
  if (!session) {
    console.error('deleteEvent: no session found');
    return { error: 'no session found' };
  }
  try {
    // Check if event exist and user is creator or admin
    const eventToDelete = await selectEventByIdService(eventId);
    console.log(eventToDelete);
    if (!eventToDelete) {
      console.error('deleteEvent: event not found');
      return { ok: false, message: 'Aucun événement trouvé' };
    }
    if (session.user.role !== 'admin') {
      if (eventToDelete.user?.id !== session.user.id) {
        console.error('deleteEvent: user is not the creator');
        return {
          ok: false,
          message: "Vous n'êtes pas le créateur de cet événement",
        };
      }
    }
    // delete image of the event
    if (eventToDelete.image) {
      await deleteImage(eventToDelete.image);
    }
    if (eventToDelete.conversation) {
      await deleteConversationService(eventToDelete.conversation.id);
    }
    if (eventToDelete.Tasks && eventToDelete.Tasks.length > 0) {
      await Promise.all(
        eventToDelete.Tasks.map((task) => deleteUserTask(task.id as string))
      );
    }
    await deleteEventService(eventId);
    return { ok: true, message: 'Événement supprimé avec succès' };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Erreur lors de la suppression de l'événement",
    };
  }
};
