'use client';

import { EventWithUserAndCount } from '@/types/types';
import { Icon } from 'facu-ui';
import { Link } from 'next-view-transitions';
import { useState } from 'react';
import TasksProfile from '../dashboard/TasksProfile';
import DeleteEventModal from '../modals/DeleteEventModal';

export default function OwnerEventCard({
  event,
}: {
  event: EventWithUserAndCount;
}) {
  const [cardOpen, setCardOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  function calculateDaysDifference(dateStart: Date) {
    const fechaActual: Date = new Date();
    const diferenciaTiempo = dateStart.getTime() - fechaActual.getTime();
    const diferenciaDias = Math.round(diferenciaTiempo / (1000 * 60 * 60 * 24));
    return diferenciaDias;
  }
  const daysFromToday = calculateDaysDifference(event.eventStart);
  const pendingTasks = event.Tasks?.filter((task) => !task.completed);
  const toggleDeleteModal = () => {
    setModalOpen(!modalOpen);
  };
  console.log(event.UserInvitations);
  return (
    <div className="relative flex flex-col gap-2 justify-between w-full h-fit p-5 border border-dark-bg dark:border-light-grey rounded-lg">
      <div className="font-extralight text-lg flex flex-wrap gap-5 select-none">
        <h1 className="font-bold text-2xl">{event.title}</h1>
        {daysFromToday > 0 ? (
          <p>{daysFromToday} jours restants</p>
        ) : (
          <p>
            Passé il fait {daysFromToday} {daysFromToday > 1 ? 'jours' : 'jour'}
          </p>
        )}
        <p>{event._count.participants} participants</p>
        <p>{pendingTasks?.length || 0} tâches à accomplir</p>
        <div className="absolute right-5 top-7">
          {cardOpen ? (
            <Icon
              type="minus"
              strokeWidth={3}
              onClick={() => setCardOpen(false)}
            />
          ) : (
            <Icon
              type="plus"
              strokeWidth={3}
              onClick={() => setCardOpen(true)}
            />
          )}
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          cardOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-wrap gap-2 mt-2 mb-5">
          <Link href={`/events/event/${event.id}`} className="primary-btn">
            Éditer
          </Link>
          <button className="primary-btn">Inviter des participants</button>
          <button className="secondary-btn" onClick={toggleDeleteModal}>
            Supprimer
          </button>
        </div>
        <TasksProfile tasks={event.Tasks || []} eventId={event.id} />
      </div>
      {modalOpen && (
        <DeleteEventModal event={event} toggleModal={toggleDeleteModal} />
      )}
    </div>
  );
}
