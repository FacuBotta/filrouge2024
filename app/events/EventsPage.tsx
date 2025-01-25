import PageHeader from '@/components/layouts/PageHeader';
import EventCard from '@/components/ui/dashboard/EventCard';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';
import { Link } from 'next-view-transitions';
export default async function EventsPage({
  events,
  category,
}: {
  events: EventWithUserAndCount[];
  category: Category;
}) {
  return (
    <section className="animate max-w-[1000px]  mx-auto flex flex-col px-2">
      <PageHeader title={category.title} searchType="events" />
      <p className="text-left max-w-[700px] ml-0 sm:mt-5 4xl:mt-0 sm:pl-10 font-light">
        {category.description}
      </p>
      {events.length === 0 || !events ? (
        <div className="w-full h-full flex flex-col px-2 mt-20 items-start gap-5">
          <p>Aucune événement dans cette catégorie</p>
          <Link className="primary-btn " href={'/events/new'}>
            Fait le premier en le creer ! 📅
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {events.map((event) => (
            <EventCard key={event.id} event={event} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}
