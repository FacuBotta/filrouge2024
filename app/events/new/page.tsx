import { selectCategories } from '@/actions/eventsServerActions/selectCategories';
import { NewEventPage } from './newEventPage';
import { Category } from '@prisma/client';

export default async function NewEventPagePage() {
  const categories: Category[] = await selectCategories();

  return <NewEventPage availableCategories={categories} />;
}
