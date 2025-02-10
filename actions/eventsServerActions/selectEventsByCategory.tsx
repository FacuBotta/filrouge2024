'use server';

import prisma from '@/lib/prisma';
import { categoryTitleSchema } from '@/lib/zodSchemas';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';

export const selectEventsByCategory = async (
  category: string
): Promise<{
  events: EventWithUserAndCount[] | [];
  category: Category | null;
}> => {
  try {
    const validatedCategoryTitle = categoryTitleSchema.parse(
      category.replace(/-/g, ' ')
    );

    const categoryData = await prisma.category.findFirst({
      where: {
        title: validatedCategoryTitle,
      },
    });
    if (!categoryData) {
      return { events: [], category: null };
    }

    const events: EventWithUserAndCount[] | [] = await prisma.events.findMany({
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
        conversation: {
          select: {
            id: true,
          },
        },
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            image: true,
            description: true,
            _count: {
              select: {
                EventsCreated: true,
                Ratings: true,
              },
            },
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
      where: {
        categoryId: categoryData.id,
      },
      orderBy: {
        title: 'asc',
      },
    });

    return { events, category: categoryData };
  } catch (error) {
    console.error('selectEventsByCategory: error', error);
    return { events: [], category: null };
  }
};
