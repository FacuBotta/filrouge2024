import prisma from '@/lib/prisma';
import EventsPage from './EventsPage';
import { redirect } from 'next/navigation';
import { selectAllEvents } from '@/actions/eventsServerActions/selectAllEvents';

export default async function DefaultEventsPage() {
  const events = await selectAllEvents();
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
  if (!categories || !events) {
    redirect('/');
  }
  return (
    <div>
      {categories.map((category) => (
        <EventsPage key={category.id} events={events} category={category} />
      ))}
    </div>
  );
}
