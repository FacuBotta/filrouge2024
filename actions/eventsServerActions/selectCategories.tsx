'use server';

import { selectAllCategoriesService } from '@/services/categoriesServices';
import { Category } from '@prisma/client';

export const selectCategories = async (): Promise<Category[]> => {
  try {
    const categories = await selectAllCategoriesService();
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};
