import { UserJoinedEvent } from '@/types/types';
import { Category, Events } from '@prisma/client';
import Link from 'next/link';
import IconWrapper from '../IconWrapper';

export default function EventCard({
  category,
  event,
}: {
  category: Category;
  event: Events | UserJoinedEvent;
}): JSX.Element {
  return (
    <div className="animate group relative w-[300px] flex border border-dark-bg dark:border-light-grey rounded-lg p-5 gap-2 flex-col overflow-hidden shadow-xl bg-light-blue dark:bg-slate-500/20">
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
          <p className="mb-2">Catégorie : {category.title}</p>
          <p className="text-sm">
            Début le : {event.eventStart.toLocaleDateString()} a{' '}
            {event.eventStart.toLocaleTimeString()}
          </p>
          <p className="text-sm">
            Termine le : {event.eventEnd.toLocaleDateString()} a{' '}
            {event.eventEnd.toLocaleTimeString()}
          </p>
        </div>
        <p className="">{event.description}</p>
      </div>
      <div className=" flex items-end justify-center pb-5 absolute bottom-0 left-0 w-full h-[80%]  bg-gradient-to-t from-light-blue dark:from-dark-bg to-transparent ">
        <IconWrapper
          width={30}
          type="infoCircle"
          strokeWidth={2}
          className="hover:dark:text-dark-greenLight hover:scale-110 transition-all ease-in-out"
        />
      </div>
    </div>
  );
}
