import { selectCategories } from '@/actions/eventsServerActions/selectCategories';
import { NewEventPage } from './newEventPage';
import { Category } from '@prisma/client';

export default async function NewEventPagePage() {
  const categories = await selectCategories();
  const availableCategories: string[] = categories.map(
    (category: Category) => category.title
  );
  return <NewEventPage availableCategories={availableCategories} />;
}
