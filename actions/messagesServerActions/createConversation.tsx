'use server';

import { auth } from '@/lib/auth/authConfig';
import { createConversationService } from '@/services/conversationServices';
import { createUserConversationService } from '@/services/userConversationServices';
import { Role } from '@prisma/client';
// TODO : documentar esto
/**
 * Create a conversation
 * A conversation can be attached to an event or not
 * For create a conversation for a event, eventId most be provide in formData
 * formData structure :
 * sujet
 * participantsId ?
 * eventId ?
 * @param formData
 * @returns
 */
interface createConversationProps {
  sujet: string;
  participantsId: string[] | null;
  eventId: string;
}
export async function createConversation({
  sujet,
  participantsId,
  eventId,
}: createConversationProps) {
  const { user } = (await auth()) || {};
  if (!user) {
    console.error('createConversation: no user found');
    return;
  }
  try {
    // create the conversation attached to the event
    const newConversation = await createConversationService({
      title: sujet,
      eventId,
    });
    // add the event creator to the conversation
    await createUserConversationService({
      userId: user.id as string,
      conversationId: newConversation.id,
      role: 'CREATOR',
    });

    // if participants, add them to the conversation
    if (participantsId && participantsId.length > 0) {
      const participantsFormate = participantsId.map((id) => ({
        userId: id,
        conversationId: newConversation.id,
      }));
      await Promise.all(
        participantsFormate.map(async (participant) => {
          await createUserConversationService({
            userId: participant.userId,
            conversationId: newConversation.id,
            role: 'GUEST' as Role,
          });
        })
      );
    }

    // revalidatePath('/messages');
    return newConversation;
  } catch (error) {
    console.error('Error creating new conversation:', error);
    return null;
  }
}
