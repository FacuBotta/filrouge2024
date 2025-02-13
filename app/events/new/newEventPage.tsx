'use client';

import { createEvent } from '@/actions/eventsServerActions/createEvent';
import SelectUserList from '@/components/forms/SelectUserList';
import AutocompletedMapCard from '@/components/ui/cards/AutocompleteMapCard';
import { NewEventForm, newEventSchema } from '@/lib/zodSchemas';
import { BasicProfileInformation, EventAddress } from '@/types/types';
import { Category } from '@prisma/client';
import { Icon } from 'facu-ui';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
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
    image: { message: '', value: false },
  });
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [finalAddress, setFinalAddress] = useState<EventAddress | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  // Prevent accidentals submit when pressing enter in the form
  // e.preventDefault() wasn't enough to make it work
  const handleKeyDownImageInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  const handleImagePreview = () => {
    setError({
      ...error,
      image: { message: '', value: false },
    });
    setImagePreview('');
    if (imageInputRef.current) {
      const file = imageInputRef.current.files?.[0];
      if (!file) return;
      if (file.size > 2000000) {
        setError({
          ...error,
          image: { message: 'La taille du fichier dépasse 2Mo !', value: true },
        });
        imageInputRef.current.value = '';
        return;
      }
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  // Take the selected users and close the modal
  const setSelectedUsers = (selectedUsers: string[]) => {
    setSelectedParticipants(selectedUsers);
    setIsUserListOpen(false);
  };
  const closeModal = () => {
    setSelectedParticipants([]);
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
      image: { message: '', value: false },
    });
    if (!finalAddress) {
      setError({
        ...error,
        address: { message: 'Ubication obligatoire', value: true },
      });
      return;
    }

    const formData = new FormData(e.currentTarget);

    const endSameDay = formData.get('endSameDay') === 'on';

    const eventData: NewEventForm = {
      title: formData.get('title') as string,
      categoryId: formData.get('category') as string,
      isPublic: formData.get('isPublic') === 'on',
      image: formData.get('image') as File,
      eventStart: new Date(formData.get('eventStart') as string),
      eventEnd: endSameDay
        ? null
        : new Date(formData.get('eventEnd') as string),
      description: formData.get('description') as string,
      participants: selectedParticipants,
      address: {
        url: finalAddress.url as string,
        lat: finalAddress.lat as number,
        lng: finalAddress.lng as number,
        formattedAddress: finalAddress.formattedAddress as string,
        vicinity: finalAddress.vicinity as string,
      },
    };

    try {
      newEventSchema.parse(eventData);
      const response = await createEvent(eventData);
      if (response?.ok) {
        toast.success(response.message);
        router.push(`/events`);
      }
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
      } else if (err instanceof Error) {
        toast.error(err.message);
        console.log(err);
      }
      toast.error('Une erreur est survenue 😑');
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <header className="relative w-full mb-5">
        <h1 className="text-4xl font-bold">Créer un éventement 🚀</h1>
        <button onClick={() => router.back()}>
          <Icon
            type="goBack"
            strokeWidth={2}
            className="size-10 absolute right-[10px] top-[10px]"
          />
        </button>
      </header>
      <main className="flex flex-col items-center justify-center mb-5 w-full relative rounded-xl border-2 border-light-borderCards bg-light-cards dark:border-dark-borderCards dark:bg-dark-cards">
        <form className="flex flex-col w-full gap-5 " onSubmit={handleSubmit}>
          <header
            className="h-[300px] w-full border-b-2 border-black dark:border-dark-borderCards relative hover:bg-light-grey/10 bg-cover bg-center"
            style={{ backgroundImage: `url(${imagePreview})` }}
          >
            <input
              ref={imageInputRef}
              onChange={() => handleImagePreview()}
              onKeyDown={handleKeyDownImageInput}
              type="file"
              accept="image/*"
              name="image"
              required={true}
              className="relative h-full w-full opacity-0 cursor-pointer"
            ></input>
            <span
              className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl dark:text-light-grey/50 cursor-pointer ${error.image.value ? 'text-red-500' : ''}`}
            >
              {error.image.value
                ? error.image.message
                : 'Sélectionner une image'}
            </span>
          </header>
          <section className="flex w-full gap-5 mt-2 justify-between  flex-wrap px-5">
            {/* Title, category and public fields */}
            <fieldset className="flex flex-col sm:w-[50%] ">
              <div className="flex w-full gap-2 flex-col">
                <input
                  className="newEventInput sm:!w-[500px] "
                  type="text"
                  name="title"
                  placeholder="Titre du événement (max 100 caractères)"
                  required={true}
                />
                {error.title?.value && (
                  <span className="text-red-500 text-[1.2rem] mx-auto">
                    {error.title?.message}
                  </span>
                )}
                <select className="newEventInput" name="category">
                  <option>Catégorie</option>
                  {availableCategories.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                {error.category?.value && (
                  <span className="text-red-500 text-[1.2rem] mx-auto">
                    {error.category?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-5">
                <button
                  type="button"
                  className="primary-btn h-10"
                  onClick={() => setIsUserListOpen(true)}
                >
                  Inviter des participants
                </button>
                <label
                  htmlFor="isPublic"
                  className="text-xl flex gap-2 select-none ml-2"
                >
                  <input
                    type="checkbox"
                    name="isPublic"
                    id="isPublic"
                    className="w-4"
                  />
                  Événement publique
                </label>
              </div>
            </fieldset>
            {/* Dates Fields */}
            <fieldset className="flex flex-col gap-2">
              <label
                htmlFor="eventStart"
                className="text-2xl flex flex-col gap-2"
              >
                Commence le:
                <input
                  className="newEventInput w-[250px] sm:w-[320px] sm:ml-3"
                  type="datetime-local"
                  name="eventStart"
                  placeholder="Date de début"
                />
              </label>
              {error.eventStart?.value && (
                <span className="text-red-500 text-[1.2rem] mx-auto">
                  {error.eventStart?.message}
                </span>
              )}
              <label
                htmlFor="eventEnd"
                className="text-2xl flex flex-col gap-2"
              >
                Se termine le:
                <input
                  className="newEventInput w-[250px] sm:w-[320px] sm:ml-3"
                  type="datetime-local"
                  name="eventEnd"
                  placeholder="Date de fin"
                />
              </label>
              <label
                htmlFor="endSameDay"
                className="text-xl flex gap-2 select-none ml-3"
              >
                <input
                  type="checkbox"
                  name="endSameDay"
                  id="endSameDay"
                  className="w-4"
                />
                Se termine la même journée
              </label>
            </fieldset>
          </section>
          <section className="flex gap-5 w-full justify-between items-start mt-2 flex-wrap px-5 ">
            <textarea
              className="p-4 mt-10 border-2 border-black dark:border-dark-grey/50 rounded-lg dark:bg-transparent dark:placeholder:text-dark-greenLight/50 w-full"
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
            <button className="primary-btn w-full" type="submit">
              Créer l&apos;événement
            </button>
          </div>
        </form>
        {isUserListOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center sm:pt-20">
            <SelectUserList
              users={contacts}
              takeUsers={setSelectedUsers}
              closeModal={closeModal}
            />
          </div>
        )}
      </main>
    </div>
  );
};
