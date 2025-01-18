import { UserAvatar } from '@/public/images/UserAvatar';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';
import { Link } from 'next-view-transitions';
export default async function EventCard({
  category,
  event,
}: {
  category: Category;
  event: EventWithUserAndCount;
}): Promise<JSX.Element> {
  return (
    <Link
      href={`/events/event/${event.id}`}
      className="group relative w-[300px] flex border border-dark-bg dark:border-light-grey rounded-lg p-5 pb-10 gap-2 flex-col overflow-hidden shadow-xl bg-light-blue dark:bg-slate-500/20"
    >
      <div className="group-hover:animate-scaleHover transition-transform duration-700">
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
          <p className="text-sm">
            Termine le : {event.eventEnd.toLocaleDateString()} a{' '}
            {event.eventEnd.toLocaleTimeString()}
          </p>
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
        <p className="text-sm">{event.description}</p>
      </div>
    </Link>
  );
}
