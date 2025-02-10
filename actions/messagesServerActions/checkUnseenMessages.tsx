'use server';
import { selectUnseenMessagesService } from '@/services/messagesStatusServices';

export async function checkUnseenMessages(userId: string) {
  const unseenMessages = await selectUnseenMessagesService({ userId });
  return unseenMessages.length;
}
