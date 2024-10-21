'use client';

import Button from '@/components/ui/Button';
import EventCard from '@/components/ui/dashboard/EventCard';
import CityTourImage from '@/public/images/categoryImages/CityTourImage';
import { Category, Events } from '@prisma/client';
import { useEffect, useState } from 'react';

export default function AllEventsPage({ events }: { events: Category[] }) {
  const [clientEvents, setClientEvents] = useState<any>(
    events.filter((category: any) => category.Events.length > 0)
  );
  console.log(clientEvents);
  const categoryImages: { [key: string]: any } = {
    'city-tours': require('@/public/images/categoryImages/CityTourImage')
      .default,
    education: require('@/public/images/categoryImages/EducationImage').default,
    language: require('@/public/images/categoryImages/LanguageImage').default,
    sport: require('@/public/images/categoryImages/SportImage').default,
    outdoor: require('@/public/images/categoryImages/OutdoorImage').default,
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
  }

  return (
    <section className="animate w-full flex flex-col px-2">
      {clientEvents?.map((category: any) => (
        <div
          id={category.title.toLowerCase().replaceAll(' ', '-')}
          key={category.id}
          className="flex w-full min-h-[80vh] mx-auto mb-10 flex-col gap-5 justify-center items-center scroll-mt-40 "
        >
          <h1 className="font-bold text-3xl dark:text-dark-greenLight">
            {category.title}
          </h1>
          <div className="flex flex-col justify-center items-center">
            {getCategoryImage(category.title)}
            <p className="text-center max-w-[500px] font-light">
              {category.description}
            </p>
          </div>
          <a
            className="inline-flex items-center justify-center px-4 py-1 border-2 text-lg rounded-lg bg-light-yellow text-dark-bg font-bold border-dark-bg hover:scale-105 hover:shadow-lg  transition-transform duration-300 ease-in-out "
            href="./events/new"
          >
            Créer un événement!
          </a>
          <div className=" flex flex-wrap gap-5 w-full justify-center max-w-[1000px] mt-5">
            {category?.Events?.map((event: Events) => (
              <EventCard key={event.id} event={event} category={category} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
