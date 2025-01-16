import { selectAllEvents } from '@/actions/eventsServerActions/selectAllEvents';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import EventsPage from './EventsPage';

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
    <div className="w-full h-full">
      {categories.map((category) => (
        <EventsPage key={category.id} events={events} category={category} />
      ))}
    </div>
  );
}
