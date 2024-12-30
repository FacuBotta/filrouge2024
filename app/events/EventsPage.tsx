import EventCard from '@/components/ui/dashboard/EventCard';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';
import Link from 'next/link';

export default async function EventsPage({
  events,
  category,
}: {
  events: EventWithUserAndCount[];
  category: Category;
}) {
  if (!events || events.length === 0) {
    return (
      <section className="w-full flex flex-col px-2 items-center gap-5">
        <p>Aucune événement dans cette catégorie</p>
        <Link className="primary-btn mx-auto mb-5" href={'/events/new'}>
          Creer un événement 📅
        </Link>
      </section>
    );
  }
  /* const categoryImages: { [key: string]: any } = {
    'city-tours': require('@/public/images/categoryImages/CityTourImage')
      .default,
    education: require('@/public/images/categoryImages/EducationImage').default,
    language: require('@/public/images/categoryImages/LanguageImage').default,
    sport: require('@/public/images/categoryImages/SportImage').default,
    'air-libre': require('@/public/images/categoryImages/OutdoorImage').default,
    autres: require('@/public/images/categoryImages/OthersImage').default,
  };

  function getCategoryImage(categoryTitle: string) {
    const formattedCategoryTitle = categoryTitle
      .toLowerCase()
      .replaceAll(' ', '-');

    const ImageComponent = categoryImages[formattedCategoryTitle];

    if (ImageComponent) {
      return <ImageComponent />;
    } else {
      return null; // TODO: add a default image component
    }
  } */

  return (
    <section className="w-full flex flex-col px-2">
      <h2 className="text-2xl font-bold my-5 mx-auto">{category.title}</h2>
      <p className="text-center max-w-[700px] mb-5 mx-auto font-light">
        {category.description}
      </p>
      <Link className="primary-btn mx-auto mb-5" href={'/events/new'}>
        Creer un événement 📅
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} category={category} />
        ))}
      </div>
    </section>
  );
}
