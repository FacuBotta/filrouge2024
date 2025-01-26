'use client';

import SelectUserList from '@/components/forms/SelectUserList';
import AutocompletedMapCard from '@/components/ui/cards/AutocompleteMapCard';
import IconWrapper from '@/components/ui/IconWrapper';
import { NewEventForm, newEventSchema } from '@/lib/zodSchemas';
import { BasicProfileInformation, EventAddress } from '@/types/types';
import { Category } from '@prisma/client';
import { Input } from 'facu-ui';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { z } from 'zod';
export const NewEventPage = ({
  availableCategories,
  contacts,
}: {
  availableCategories: Category[];
  contacts: BasicProfileInformation[];
}) => {
  // const [isPending, startTransition] = useTransition();
  const [error, setError] = useState({
    title: { message: '', value: false },
    category: { message: '', value: false },
    eventStart: { message: '', value: false },
    eventEnd: { message: '', value: false },
    description: { message: '', value: false },
    address: { message: '', value: false },
  });
  const router = useRouter();
  const [finalAddress, setFinalAddress] = useState<EventAddress | null>(null);

  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<
    BasicProfileInformation[]
  >([]);

  const setSelectedUsers = (selectedUsers: BasicProfileInformation[]) => {
    setSelectedParticipants(selectedUsers);
    setIsUserListOpen(!isUserListOpen);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      title: { message: '', value: false },
      category: { message: '', value: false },
      eventStart: { message: '', value: false },
      eventEnd: { message: '', value: false },
      description: { message: '', value: false },
      address: { message: '', value: false },
    });
    if (!finalAddress) {
      setError({
        ...error,
        address: { message: 'Ubication obligatoire', value: true },
      });
      return;
    }

    const formData = new FormData(e.currentTarget);

    const eventData: NewEventForm = {
      title: formData.get('title') as string,
      categoryId: formData.get('category') as string,
      isPublic: formData.get('isPublic') === 'on',
      image: formData.get('image') as File,
      eventStart: formData.get('eventStart') as string,
      eventEnd: formData.get('eventEnd') as string,
      description: formData.get('description') as string,
      participants: selectedParticipants.map((user) => user.id).join(','),
      address: finalAddress,
    };

    try {
      newEventSchema.parse(eventData);
      console.log(eventData);
      // const response = await createEvent(eventData);
      // TODO : cerrar el modal luego de crear el evento
      // console.log(response);
    } catch (err) {
      console.log(err);
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          const field = error.path[0];
          setError((prevError) => ({
            ...prevError,
            [field]: { message: error.message, value: true },
          }));
        });
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <header className="relative w-full mb-5">
        <h1 className="text-4xl font-bold">Créer un éventement 🚀</h1>
        <button onClick={() => router.back()}>
          <IconWrapper
            type="goBack"
            strokeWidth={2}
            className="size-10 absolute right-[10px] top-[10px]"
          />
        </button>
      </header>
      <main className="flex flex-col items-center justify-center mb-5 w-full bg-light-ciel relative rounded-xl border-2 border-light-yellow dark:bg-light-grey/10">
        <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
          <header className="h-[200px] w-full border-b relative hover:bg-light-grey/10">
            <input
              type="file"
              name="image"
              required={true}
              className="h-full w-full opacity-0 cursor-pointer"
            ></input>
            <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl text-light-grey/50 cursor-pointer">
              Sélectionner une image
            </span>
          </header>
          <section className="flex gap-5 w-full justify-between items-start mt-2 flex-wrap px-5">
            <fieldset className="flex flex-1 flex-col gap-2 h-32 w-full ">
              <input
                className="input-light"
                type="text"
                name="title"
                placeholder="Titre du événement (max 100 caractères)"
                required={true}
              />
              <select
                className="bg-dark-bg p-3 mt-2 border-b min-w-[200px] border-dark-bg dark:border-white"
                name="category"
              >
                <option>Categorie</option>
                {availableCategories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <div className="flex gap-2 mt-5 justify-betwee flex-wrap">
                <button
                  className="primary-btn h-10"
                  onClick={() => setIsUserListOpen(true)}
                >
                  Inviter des participants
                </button>
                <label
                  htmlFor="isPublic"
                  className="text-xl flex gap-2 select-none ml-2"
                >
                  <input type="checkbox" name="isPublic" id="isPublic" />
                  Événement publique
                </label>
              </div>
            </fieldset>
            <fieldset className="flex flex-col flex-1 gap-2 ">
              <label
                htmlFor="eventStart"
                className="text-2xl flex flex-col gap-2"
              >
                Commence le:
                <Input
                  className="input-light"
                  type="datetime-local"
                  name="eventStart"
                  placeholder="Date de début"
                  error={{
                    message: error.eventStart?.message,
                    value: error.eventStart?.value,
                  }}
                />
              </label>
              <label
                htmlFor="eventEnd"
                className="text-2xl flex flex-col gap-2"
              >
                Se termine le:
                <Input
                  className="input-light"
                  type="datetime-local"
                  name="eventEnd"
                  placeholder="Date de fin"
                  error={{
                    message: error.eventEnd?.message,
                    value: error.eventEnd?.value,
                  }}
                />
              </label>
            </fieldset>
          </section>
          <section className="flex gap-5 w-full justify-between items-start mt-2 flex-wrap px-5 ">
            <textarea
              className="p-4 mt-10 border rounded-lg bg-transparent placeholder:text-dark-greenLight/50 w-full"
              rows={10}
              name="description"
              placeholder="Description du événement (entre 30 et 1000 caractères 😉)"
            />
            {error.description?.value && (
              <span className="text-blue-500 text-[1.2rem] mx-auto">
                {error.description?.message}
              </span>
            )}
          </section>
          <section className="w-full px-5">
            <h3 className="text-2xl">Ubication :</h3>
            <span className="text-red-500">
              {error.address?.message ? error.address?.message : ''}
            </span>
            <div className="">
              <AutocompletedMapCard onAddressChange={setFinalAddress} />
            </div>
          </section>
          <div className="w-full p-5">
            <input
              className="primary-btn w-full"
              type="submit"
              value="Créer l'événement"
            />
          </div>
        </form>
        {isUserListOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center p-2">
            <SelectUserList
              users={contacts}
              closeAndTakeUsers={setSelectedUsers}
            />
          </div>
        )}
      </main>
    </div>
  );
};
