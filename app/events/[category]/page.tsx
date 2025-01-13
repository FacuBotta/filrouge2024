import { selectEventsByCategory } from '@/actions/eventsServerActions/selectEventsByCategory';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';
import { redirect } from 'next/navigation';
import EventsPage from '../EventsPage';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const urlCategory = await params.category;

  if (!urlCategory || typeof urlCategory !== 'string') {
    redirect('/events');
  }

  const {
    events,
    category,
  }: { events: EventWithUserAndCount[] | []; category: Category | null } =
    await selectEventsByCategory(urlCategory);

  if (!category) {
    redirect('/events');
  }

  return <EventsPage events={events} category={category} />;
}
