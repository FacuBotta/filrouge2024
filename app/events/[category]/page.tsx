import { redirect } from 'next/navigation';
import EventsPage from '../EventsPage';
import { selectEventsByCategory } from '@/actions/eventsServerActions/selectEventsByCategory';
import { Category } from '@prisma/client';
import { EventWithUserAndCount } from '@/types/types';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!params?.category || typeof params.category !== 'string') {
    redirect('/events');
  }

  const {
    events,
    category,
  }: { events: EventWithUserAndCount[] | []; category: Category | null } =
    await selectEventsByCategory(params.category);

  if (!category) {
    redirect('/events');
  }

  return <EventsPage events={events} category={category} />;
}
