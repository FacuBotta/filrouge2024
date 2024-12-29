'use server';

import prisma from '@/lib/prisma';
import { Category, Events } from '@prisma/client';

export const selectEventsByCategory = async (
  category: string
): Promise<{ events: Events[]; category: Category | null }> => {
  try {
    const categoryData = await prisma.category.findFirst({
      where: {
        title: category.replace(/-/g, ' '),
      },
    });
    if (!categoryData) {
      return { events: [], category: null };
    }

    const events = await prisma.events.findMany({
      where: {
        categoryId: categoryData.id,
      },
    });

    return { events, category: categoryData };
  } catch (error) {
    console.error('selectEventsByCategory: error', error);
    return { events: [], category: null };
  }
};
