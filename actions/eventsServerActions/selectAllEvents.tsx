'use server';

import prisma from '@/lib/prisma';
import { Category } from '@prisma/client';

export const selectAllEvents = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        Events: {
          include: {
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};
