'use server';

import { auth } from '@/lib/auth/authConfig';
import { createConversationService } from '@/services/conversationServices';
import { createUserConversationService } from '@/services/userConversationServices';
import { Role } from '@prisma/client';

/**
 * Create a new conversation.
 * This function can create a conversation with or without attaching it to an event.
 * If an `eventId` is provided, the conversation will be associated with the event.
 * It will also add the user initiating the conversation as the creator and any provided participants as guests.
 *
 * @param sujet - The title or subject of the conversation.
 * @param participantsId - An array of user IDs to be added as participants to the conversation.
 *                          If no participants are provided, only the creator will be added.
 * @param eventId - Optional event ID to associate the conversation with an event. If no event is provided,
 *                  the conversation will not be tied to any event.
 *
 * @returns The newly created conversation object or null if the conversation could not be created.
 */
interface createConversationProps {
  sujet: string;
  participantsId: string[] | null;
  eventId?: string;
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
    // Create the conversation, optionally associating it with an event
    const newConversation = await createConversationService({
      title: sujet,
      eventId,
    });

    // Add the creator to the conversation
    await createUserConversationService({
      userId: user.id as string,
      conversationId: newConversation.id,
      role: 'CREATOR',
    });

    // If participants are provided, add them as guests
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

    return newConversation;
  } catch (error) {
    console.error('Error creating new conversation:', error);
    return null;
  }
}
