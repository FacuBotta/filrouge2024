'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getMessagesConversation(formData: FormData) {
  const conversationId = formData.get('conversationId') as string;

  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
    include: {
      sender: {
        select: {
          email: true,
          username: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc', // Ordena los mensajes por fecha de creación ascendente
    },
  });
  revalidatePath('/Dashboard');
  return messages;
}
