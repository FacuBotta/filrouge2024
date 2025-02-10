'use server';

import { categoryTitleSchema } from '@/lib/zodSchemas';
import { selectCategoryByTitleService } from '@/services/categoriesServices';
import { selectEventsByCategoryService } from '@/services/eventServices';
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

    const categoryData = await selectCategoryByTitleService(
      validatedCategoryTitle
    );
    if (!categoryData) {
      return { events: [], category: null };
    }

    const events: EventWithUserAndCount[] | [] =
      await selectEventsByCategoryService(categoryData.id);

    return { events, category: categoryData };
  } catch (error) {
    console.error('selectEventsByCategory: error', error);
    return { events: [], category: null };
  }
};
