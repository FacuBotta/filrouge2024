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
      <h1 className="text-3xl font-bold my-5 ml-0">{category.title}</h1>
      <p className="text-left max-w-[700px] ml-0 font-light">
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
