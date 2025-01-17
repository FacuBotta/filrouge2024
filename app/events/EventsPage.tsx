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
  if (!events || events.length === 0) {
    return (
      <section className="w-full h-full flex flex-col px-2 items-center gap-5">
        <h2 className="text-2xl font-bold my-5 mx-auto">{category.title}</h2>
        <p className="text-center max-w-[700px] mb-5 mx-auto font-light">
          {category.description}
        </p>
        <p>Aucune événement dans cette catégorie</p>
        <Link className="primary-btn mx-auto mb-5" href={'/events/new'}>
          Fait le premier en le creer ! 📅
        </Link>
      </section>
    );
  }

  return (
    <section className="animate w-fit  mx-auto flex flex-col px-2">
      <h2 className="text-2xl font-bold my-5 mx-auto">{category.title}</h2>
      <p className="text-center max-w-[700px] mb-5 mx-auto font-light">
        {category.description}
      </p>
      <Link className="primary-btn mx-auto mb-5" href={'/events/new'}>
        Creer un événement 📅
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <EventCard key={event.id} event={event} category={category} />
        ))}
      </div>
    </section>
  );
}
