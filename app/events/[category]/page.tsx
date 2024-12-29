import { redirect } from 'next/navigation';
import EventsPage from '../EventsPage';
import { selectEventsByCategory } from '@/actions/eventsServerActions/selectEventsByCategory';
import { Category, Events } from '@prisma/client';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const {
    events,
    category,
  }: { events: Events[] | []; category: Category | null } =
    await selectEventsByCategory(params.category);

  if (!category) {
    redirect('/events');
  }
  return <EventsPage events={events} category={category} />;
}
