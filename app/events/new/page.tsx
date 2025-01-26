import { selectCategories } from '@/actions/eventsServerActions/selectCategories';
import { selectAllBasicUserInfos } from '@/actions/userServerActions/selectAllBasicUserInfos';
import { Category } from '@prisma/client';
import { NewEventPage } from './newEventPage';

export default async function NewEventPagePage() {
  const categories: Category[] = await selectCategories();
  const dbContacts = await selectAllBasicUserInfos();
  return (
    <NewEventPage availableCategories={categories} contacts={dbContacts} />
  );
}
