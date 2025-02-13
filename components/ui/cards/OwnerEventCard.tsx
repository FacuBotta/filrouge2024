'use client';

import { sendInvitationToEvent } from '@/actions/eventsServerActions/joinUserToEvent';
import SelectUserList from '@/components/forms/SelectUserList';
import { BasicProfileInformation, EventWithUserAndCount } from '@/types/types';
import { Icon } from 'facu-ui';
import { Link } from 'next-view-transitions';
import { useState } from 'react';
import { toast } from 'sonner';
import Badge from '../Badge';
import TasksProfile from '../dashboard/TasksProfile';
import DeleteEventModal from '../modals/DeleteEventModal';

export default function OwnerEventCard({
  event,
  contacts,
}: {
  event: EventWithUserAndCount;
  contacts: BasicProfileInformation[];
}) {
  const [cardOpen, setCardOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUserListOpen, setIsUserListOpen] = useState(false);

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
  // console.log(event.UserInvitations);
  // Take the selected users and close the modal

  const closeUserListModal = () => {
    setIsUserListOpen(!isUserListOpen);
  };
  const handleTakeUsers = async (selectedUsers: string[]) => {
    console.log({ selectedUsers });
    const response = await sendInvitationToEvent({
      eventId: event.id,
      participantsIds: selectedUsers,
    });
    if (response?.ok) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    closeUserListModal();
  };
  return (
    <div className="relative flex flex-col gap-2 justify-between w-full h-fit p-5 border border-dark-bg dark:border-light-grey rounded-lg bg-card">
      <div className="font-extralight text-lg flex flex-wrap items-center gap-5 select-none">
        <h1 className="font-bold text-2xl">{event.title}</h1>
        {daysFromToday > 0 ? (
          <Badge color="warning" onClick={() => setCardOpen(!cardOpen)}>
            <p>{daysFromToday} jours restants</p>
          </Badge>
        ) : (
          <Badge color="info" onClick={() => setCardOpen(!cardOpen)}>
            <p>
              Passé il fait {daysFromToday}{' '}
              {daysFromToday > 1 ? 'jours' : 'jour'}
            </p>
          </Badge>
        )}
        <Badge onClick={() => setCardOpen(!cardOpen)} color="success">
          {event._count.participants} participants
        </Badge>
        <Badge onClick={() => setCardOpen(!cardOpen)} color="error">
          <p>{pendingTasks?.length || 0} tâches à accomplir</p>
        </Badge>
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
          <Link href={`/events/edit/${event.id}`} className="primary-btn">
            Éditer
          </Link>
          <button
            className="primary-btn"
            onClick={() => setIsUserListOpen(true)}
          >
            Gérer les participants
          </button>
          <button className="secondary-btn" onClick={toggleDeleteModal}>
            Supprimer
          </button>
        </div>
        <TasksProfile tasks={event.Tasks || []} eventId={event.id} />
      </div>
      {modalOpen && (
        <DeleteEventModal eventId={event.id} toggleModal={toggleDeleteModal} />
      )}
      {isUserListOpen && (
        <div className="fixed z-[100] top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center sm:pt-20">
          <SelectUserList
            users={contacts}
            takeUsers={handleTakeUsers}
            closeModal={closeUserListModal}
            preSelectedUsers={event.participants?.map(
              (participant) => participant.userId
            )}
          />
        </div>
      )}
    </div>
  );
}
