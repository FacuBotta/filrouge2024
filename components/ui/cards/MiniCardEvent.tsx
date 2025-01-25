import { EventByUser } from '@/types/types';

export default function MiniCardEvent({ event }: { event: EventByUser }) {
  console.log({ event });
  function calculateDaysDifference(fechaDada: Date) {
    const fechaActual: Date = new Date();

    const diferenciaTiempo = fechaDada - fechaActual;
    const diferenciaDias = Math.round(diferenciaTiempo / (1000 * 60 * 60 * 24));
    return diferenciaDias;
  }
  const daysFromToday = calculateDaysDifference(event.eventEnd);

  return (
    <div className="flex flex-col justify-between w-full h-full p-5 border border-dark-bg dark:border-light-grey rounded-lg">
      <div className="font-extralight text-lg">
        <h1 className="font-bold text-2xl">{event.title}</h1>
        {daysFromToday > 0 ? (
          <p>{daysFromToday} jours restants</p>
        ) : (
          <p>
            Pasee il fait {daysFromToday} {daysFromToday > 1 ? 'jours' : 'jour'}
          </p>
        )}
        <p>{event._count.participants} participants</p>
        <p>{event._count.participants} taches a accomplir</p>
      </div>
    </div>
  );
}
/* <div
                key={event.id}
                className="w-full flex border border-dark-bg dark:border-light-grey rounded-lg p-5 gap-5 flex-col"
              >
                <h1 className="font-bold text-2xl">{event.title}</h1>
                <p>{event.description}</p>
              </div>
               */
