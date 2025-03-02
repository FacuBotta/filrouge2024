import { BasicEventData } from '@/types/types';
import formatDate from '@/utils/formatDates';
import { Link } from 'next-view-transitions';
import IconWrapper from '../IconWrapper';

export default function MiniCardEvent({ event }: { event: BasicEventData }) {
  return (
    <Link
      key={event.id}
      href={`/events/event/${event.id}`}
      className="w-[300px] sm:w-[250px] flex border border-card rounded-lg p-5 gap-2 flex-col justify-between overflow-hidden shadow-xl bg-card hover:opacity-80"
    >
      <div className="flex flex-col gap-2 text-left border-b border-light-borderCards dark:border-dark-borderCards pb-5">
        <h3 className="text-2xl font-bold">{event.title}</h3>
        <span className="font-thin text-lg">{event.category?.title}</span>
        <p className="mt-4 dark:text-gray-300 break-words line-clamp-3">
          {event.description}
        </p>
      </div>
      <div className="flex  justify-between ">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <IconWrapper type="calendar" />
            <div className="text-balance">
              <p>{formatDate(event.eventStart)}</p>
              {event.eventEnd && <p>{formatDate(event.eventEnd)}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconWrapper type="user" />
            {event.participants && event.participants.length > 0 ? (
              <p>
                {event.participants.length}{' '}
                {event.participants.length > 1 ? 'participants' : 'participant'}
              </p>
            ) : (
              <p>Aucun participant</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
