import { UserAvatar } from '@/public/images/UserAvatar';
import { EventWithUserAndCount } from '@/types/types';
import { Category } from '@prisma/client';
import { Link } from 'next-view-transitions';
import IconWrapper from '../IconWrapper';
export default async function EventCard({
  category,
  event,
}: {
  category: Category;
  event: EventWithUserAndCount;
}): Promise<JSX.Element> {
  return (
    <div className="animate group relative w-[300px] flex border border-dark-bg dark:border-light-grey rounded-lg p-5 pb-10 gap-2 flex-col overflow-hidden shadow-xl bg-light-blue dark:bg-slate-500/20">
      <div className="group-hover:animate-scaleHover transition-transform duration-700">
        <div className="flex justify-between ">
          <h1 className="font-bold text-xl text-wrap">{event.title}</h1>
          <div className="flex gap-2">
            <Link
              aria-label="Aller à l\'agenda de l\'événement"
              href={`/dashboard/calendar/${event.id}`}
            >
              <IconWrapper
                type="calendar"
                strokeWidth={2}
                className="hover:dark:text-dark-greenLight hover:scale-110 transition-all ease-in-out"
              />
            </Link>
            <Link
              aria-label="Ouvrir les details de l\'événement"
              href={'/dashboard/events'}
            >
              <IconWrapper
                type="logIn"
                strokeWidth={2}
                className="hover:dark:text-dark-greenLight hover:scale-110 transition-all ease-in-out"
              />
            </Link>
          </div>
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
      <div className=" flex items-end justify-center pb-5 absolute bottom-0 left-0 w-full h-[80%]  bg-gradient-to-t from-light-blue dark:from-dark-bg to-transparent ">
        <a href={`/events/event/${event.id}`}>
          <IconWrapper
            width={30}
            type="infoCircle"
            strokeWidth={2}
            className="hover:dark:text-dark-greenLight hover:scale-110 transition-all ease-in-out"
          />
        </a>
      </div>
    </div>
  );
}
