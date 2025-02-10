import prisma from '@/lib/prisma';
import { Category } from '@prisma/client';

export const selectAllCategoriesService = async (): Promise<Category[]> => {
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

export const selectCategoryByTitleService = async (
  title: string
): Promise<Category | null> => {
  try {
    const category: Category | null = await prisma.category.findFirst({
      where: {
        title,
      },
    });
    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
};
