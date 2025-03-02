'use server';

import { categoryTitleSchema } from '@/lib/zod/zodSchemas';
import { selectCategoryByTitleService } from '@/services/categoriesServices';
import { selectEventsByCategoryService } from '@/services/eventServices';
import { BasicEventData } from '@/types/types';
import { Category } from '@prisma/client';

export const selectEventsByCategory = async (
  category: string
): Promise<{
  events: BasicEventData[] | [];
  category: Category | null;
}> => {
  try {
    const validatedCategoryTitle = categoryTitleSchema.parse(
      category.replace(/-/g, ' ')
    );

    const categoryData = await selectCategoryByTitleService(
      validatedCategoryTitle
    );
    if (!categoryData) {
      return { events: [], category: null };
    }

    const events: BasicEventData[] | [] = await selectEventsByCategoryService(
      categoryData.id
    );

    return { events, category: categoryData };
  } catch (error) {
    console.error('selectEventsByCategory: error', error);
    return { events: [], category: null };
  }
};
