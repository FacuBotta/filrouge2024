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
  const defaultCategory = {
    id: 'tous les événements',
    title: 'Tous les événements',
    description: 'Tous les événements',
  };
  return (
    <div className="w-full h-full">
      <EventsPage events={events} category={defaultCategory} />
    </div>
  );
}
