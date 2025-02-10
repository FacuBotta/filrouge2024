'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

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
export async function createConversation(formData: FormData) {
  const { user: sender } = (await auth()) || {};
  if (!sender) {
    console.error('createConversation: no sender found');
    return;
  }

  const sujet = formData.get('sujet') as string;
  const participantsId = formData.getAll('participantsId') as string[];
  const eventId = formData.get('eventId') as string;
  try {
    // create the conversation attached to the event
    const newConversation = await prisma.conversation.create({
      data: {
        title: sujet,
        eventId: eventId || null,
      },
    });
    // add the event creator to the conversation
    await prisma.userConversation.create({
      data: {
        userId: sender.id as string,
        conversationId: newConversation.id,
        role: 'CREATOR',
      },
    });

    // if participants, add them to the conversation
    if (participantsId.length > 0) {
      const participantsIdArray = participantsId[0].split(',');
      const participantsFormate = participantsIdArray.map((id) => ({
        userId: id,
        conversationId: newConversation.id,
      }));
      // Si hay participantes adicionales, los agregamos
      if (participantsFormate.length > 0) {
        await prisma.userConversation.createMany({
          data: participantsFormate,
        });
      }
    }

    // revalidatePath('/messages');
    return { ok: true, conversation: newConversation };
  } catch (error) {
    console.error('Error creating new conversation:', error);
    return { ok: false, message: error };
  }
}
