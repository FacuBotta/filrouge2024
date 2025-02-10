import { deleteEvent } from '@/actions/eventsServerActions/deleteEvent';
import { deleteConversation } from '@/actions/messagesServerActions/deleteConversation';
import { deleteUserTask } from '@/actions/TasksServerActions/deleteUserTask';
import SubmitButton from '@/components/forms/SubmitFormButtom';
import { EventWithUserAndCount } from '@/types/types';
import { redirect } from 'next/navigation';
import React from 'react';

interface DeleteEventModalProps {
  event: EventWithUserAndCount;
  toggleModal: () => void;
}
export default function DeleteEventModal({
  event,
  toggleModal,
}: DeleteEventModalProps) {
  const handleSubmitDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventId = event.id;
    const conversationId = event.conversation?.id;
    const eventTasks = event.Tasks;
    try {
      await deleteConversation(conversationId as string);
      if (eventTasks && eventTasks.length > 0) {
        await Promise.all(
          eventTasks.map((task) => deleteUserTask(task.id as string))
        );
      }
      await deleteEvent({ eventId, imagePath: event.image });
    } catch (error) {
      console.error(error);
    }
    redirect('/profile');
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/90 flex items-center justify-center">
      <div className="flex flex-col gap-2 w-full text-center">
        <h1 className="font-bold text-2xl">
          Êtes-vous sûr de vouloir supprimer cet événement ?
        </h1>
        <p className="text-center text-lg font-extralight">
          Cette action est irréversible.
        </p>
        <form
          onSubmit={(e) => handleSubmitDelete(e)}
          className="flex flex-wrap w-full justify-center gap-2"
        >
          <SubmitButton
            text="Supprimer"
            loadingText="Suppression..."
            className="secondary-btn"
          />
          <button onClick={toggleModal} className="primary-btn">
            Non, annuler
          </button>
        </form>
      </div>
    </div>
  );
}
