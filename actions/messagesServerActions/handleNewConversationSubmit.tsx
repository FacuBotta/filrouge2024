'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function handleNewConversationSubmit(formData: FormData) {
  const { user: sender } = (await auth()) || {};
  if (!sender) {
    console.error('handleNewConversationSubmit: no sender found');
    return;
  }

  const sujet = formData.get('sujet') as string;
  const participantsId = formData.getAll('participantsId') as string[];
  const participantsIdArray = participantsId[0].split(',');

  try {
    // Crear la conversación y los participantes asociados
    const newConversation = await prisma.conversation.create({
      data: {
        title: sujet,
      },
    });
    // create de userConversation
    const participantsFormate = participantsIdArray.map((id) => {
      return { userId: id, conversationId: newConversation.id };
    });

    await prisma.userConversation.createMany({
      data: [
        {
          userId: sender.id as string,
          conversationId: newConversation.id,
          role: 'CREATOR',
        },
        ...participantsFormate,
      ],
    });
    revalidatePath('/messages');
    return { ok: true, conversation: newConversation };
  } catch (error) {
    console.error('Error creating new conversation:', error);
    return { ok: false, message: error };
  }
}
