import { selectAllEvents } from '@/actions/eventsServerActions/selectAllEvents';
import { Category, Events } from '@prisma/client';
import AllEventsPage from './EventsPage';
import { selectCategories } from '@/actions/eventsServerActions/selectCategories';

export default async function EventsPage() {
  const allEvents: Category[] = await selectAllEvents();

  return (
    <main className="h-dvh w-full pb-14 pt-2  flex flex-col-reverse sm:flex-col gap-2 bg-light-ciel dark:bg-dark-bg overflow-y-scroll scroll-smooth no-scrollbar">
      <AllEventsPage events={allEvents} />;
    </main>
  );
}
