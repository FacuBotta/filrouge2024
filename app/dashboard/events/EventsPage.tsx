'use client';

import Button from '@/components/ui/Button';
import EventCard from '@/components/ui/dashboard/EventCard';
import { Category, Events } from '@prisma/client';
import { useEffect, useState } from 'react';

export default function AllEventsPage({ events }: { events: Category[] }) {
  const [clientEvents, setClientEvents] = useState<any>(
    events.filter((category: any) => category.Events.length > 0)
  );

  console.log('categories', clientEvents);
  // Set the scroll to top when the page is loaded, it's a hack to fix the scroll position when its loaded from ./events/#category.title
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="animate w-full flex flex-col px-2  snap-start">
      {clientEvents?.map((category: any) => (
        <div
          id={category.title.toLowerCase().replaceAll(' ', '-')}
          key={category.id}
          className="flex w-full min-h-[80vh] mx-auto flex-col gap-5 justify-center items-center "
        >
          <h1 className="font-bold text-3xl dark:text-dark-greenLight">
            {category.title}
          </h1>
          <p className="text-center max-w-[500px] font-light">
            {category.description}
          </p>
          <Button>Créer un événement!</Button>
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
