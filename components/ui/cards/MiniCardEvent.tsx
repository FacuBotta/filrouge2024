import { EventWithUserAndCount } from '@/types/types';
import { Link } from 'next-view-transitions';
import IconWrapper from '../IconWrapper';

export default function MiniCardEvent({
  event,
}: {
  event: EventWithUserAndCount;
}) {
  /* function calculateDaysDifference(dateStart: Date) {
    const fechaActual: Date = new Date();

    const diferenciaTiempo = dateStart.getTime() - fechaActual.getTime();
    const diferenciaDias = Math.round(diferenciaTiempo / (1000 * 60 * 60 * 24));
    return diferenciaDias;
  }

  const daysFromToday = calculateDaysDifference(event.eventStart); */
  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('fr', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
    });
  };
  return (
    <Link
      key={event.id}
      href={`/events/event/${event.id}`}
      className="w-[300px] sm:w-[250px] flex border border-card rounded-lg p-5 gap-2 flex-col justify-between overflow-hidden shadow-xl bg-card hover:opacity-80"
    >
      <div className="flex flex-col gap-2 text-left border-b border-light-borderCards dark:border-dark-borderCards pb-5">
        <h3 className="text-2xl font-bold">{event?.title}</h3>
        <span className="font-thin text-lg">{event?.category?.title}</span>
        <p className="mt-4 dark:text-gray-300 break-words line-clamp-3">
          {event?.description}
        </p>
      </div>
      <div className="flex  justify-between ">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <IconWrapper type="calendar" />
            <div>
              <p>{formatDate(event?.eventStart)}</p>
              {event?.eventEnd && <p>{formatDate(event?.eventEnd)}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconWrapper type="user" />
            <p>{event?._count.participants} participants</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
