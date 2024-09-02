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
  const messageContent = formData.get('message') as string;
  const userRecipientId = formData.get('userRecipientId') as string;

  try {
    // Crear la conversación y los participantes asociados
    const newConversation = await prisma.conversation.create({
      data: {
        title: sujet,
        participants: {
          create: [
            { userId: sender.id as string },
            { userId: userRecipientId },
          ],
        },
        messages: {
          create: {
            senderId: sender.id as string,
            content: messageContent,
          },
        },
      },
      include: {
        participants: true,
        messages: true,
      },
    });

    console.log('New conversation created:', newConversation);
    revalidatePath(`/dashboard/messages/${newConversation.id}`);
  } catch (error) {
    console.error('Error creating new conversation:', error);
  }
}
