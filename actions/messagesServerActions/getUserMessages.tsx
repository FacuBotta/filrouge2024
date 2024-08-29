'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
// TODO: aplanar el array de conversaciones y los mensajes de cada conversación
export async function getUserMessages() {
  try {
    const { user } = (await auth()) || {};
    if (!user?.id) {
      console.error('getUserMessages: no user found');
      return;
    }
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                email: true,
                username: true,
                image: true,
              },
            },
          },
        },
        messages: {
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
        },
      },
    });

    if (!conversations) {
      console.log('getUserMessages: no conversations found');
      return [];
    }

    return conversations;
  } catch (error) {
    console.error('getUserMessages: error', error);
    return [];
  }
}
