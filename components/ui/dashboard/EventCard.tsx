import { UserAvatar } from '@/public/images/UserAvatar';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';
import { Link } from 'next-view-transitions';
import React from 'react';
export default async function EventCard({
  category,
  event,
}: {
  category: Category;
  event: EventWithUserAndCount;
}): Promise<React.JSX.Element> {
  return (
    <Link
      href={`/events/event/${event.id}`}
      className="group relative w-[300px] flex borde  r border-card rounded-lg p-5 pb-10 gap-2 flex-col overflow-hidden bg-card"
    >
      <div className="h-full flex flex-col justify-between">
        <div className="flex justify-between ">
          <h1 className="font-bold text-xl text-wrap">
            {event.title} <span> - {category.title}</span>
          </h1>
        </div>
        <div className="">
          <p className="text-sm mb-2">
            {event._count.participants} participants
          </p>
          <p className="text-sm">
            Début le : {event.eventStart.toLocaleDateString()} a{' '}
            {event.eventStart.toLocaleTimeString()}
          </p>
          {event.eventEnd && (
            <p className="text-sm">
              Termine le : {event.eventEnd.toLocaleDateString()} a{' '}
              {event.eventEnd.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 my-2">
          <UserAvatar src={event.user.image} />
          <div>
            <p className="text-sm">Cree par {event.user.username}</p>
            <p className="text-sm">
              {event.user._count?.Ratings} avis sur ce sujet
            </p>
          </div>
        </div>
        <p className="text-sm text-balance break-words line-clamp-3">
          {event.description}
        </p>
      </div>
    </Link>
  );
}
