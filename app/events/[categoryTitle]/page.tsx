import { selectEventsByCategory } from '@/actions/eventsServerActions/selectEventsByCategory';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';
import EventsPage from '../EventsPage';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryTitle: string }>;
}) {
  const { categoryTitle } = await params;
  if (categoryTitle === 'null') {
    return;
  }

  const {
    events,
    category,
  }: { events: EventWithUserAndCount[] | []; category: Category | null } =
    await selectEventsByCategory(categoryTitle);

  if (!category) {
    return <div>Category not found</div>;
  }

  return <EventsPage events={events} category={category} />;
}
