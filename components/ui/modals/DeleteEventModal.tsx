import { deleteEvent } from '@/actions/eventsServerActions/deleteEvent';
import SubmitButton from '@/components/forms/SubmitFormButtom';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface DeleteEventModalProps {
  eventId: string;
  toggleModal: () => void;
}
export default function DeleteEventModal({
  eventId,
  toggleModal,
}: DeleteEventModalProps) {
  const handleSubmitDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await deleteEvent({ eventId });
      toast.success('Événement supprimé avec succès');
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
