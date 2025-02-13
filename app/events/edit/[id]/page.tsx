import { selectCategories } from '@/actions/eventsServerActions/selectCategories';
import { selectEventById } from '@/actions/eventsServerActions/selectEventById';
import { selectAllBasicUserInfos } from '@/actions/userServerActions/selectAllBasicUserInfos';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';
import { EditEventPage } from './editEventPage';

export default async function EditEventPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const categories: Category[] = await selectCategories();
  const dbContacts = await selectAllBasicUserInfos();
  const { id } = await params;
  const event: EventWithUserAndCount | null = await selectEventById(id);
  if (!event || !event.user) {
    throw new Error("L'événement n'existe pas");
  }
  return (
    <EditEventPage
      availableCategories={categories}
      contacts={dbContacts}
      event={event}
    />
  );
}
