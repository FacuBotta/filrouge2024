'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { EventWithUserAndCount } from '@/types/types';

export const selectUserEvents = async () => {
  const session = await auth();
  if (!session) {
    console.error('selectUserEvents: no session found');
    return [];
  }
  try {
    const events: EventWithUserAndCount[] | [] = await prisma.events.findMany({
      where: {
        userId: session.user?.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        eventStart: true,
        eventEnd: true,
        isPublic: true,
        image: true,
        locationUrl: true,
        lat: true,
        lng: true,
        vicinity: true,
        formattedAddress: true,
        createdAt: true,
        updatedAt: true,
        Tasks: {
          select: {
            id: true,
            userId: true,
            eventId: true,
            content: true,
            completed: true,
            createdAt: true,
            order: true,
          },
        },
        conversation: {
          select: {
            id: true,
          },
        },
        participants: {
          select: {
            userId: true,
          },
        },
        UserInvitations: {
          select: {
            id: true,
            participantId: true,
            creatorId: true,
            eventId: true,
            conversationId: true,
            createdAt: true,
            status: true,
          },
        },
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },

      orderBy: {
        eventStart: 'asc',
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
