'use server';
import { updateMessageStatusService } from '@/services/messagesStatusServices';
// TODO : delete messages from messagesStatus when seen ?
export async function updateMessagesStatus({
  userId,
  conversationId,
}: {
  userId: string;
  conversationId: string;
}) {
  try {
    await updateMessageStatusService({ userId, conversationId });
  } catch (error) {
    console.error('updateMessagesStatus action: error', error);
    return { ok: false, message: 'Erreur lors de la mise à jour des messages' };
  }
}
