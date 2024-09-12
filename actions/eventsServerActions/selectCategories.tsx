'use server';

import prisma from '@/lib/prisma';
import { Category } from '@prisma/client';

export const selectCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
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
