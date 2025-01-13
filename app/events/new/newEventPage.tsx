'use client';

import { createEvent } from '@/actions/eventsServerActions/createEvent';
import Backdrop from '@/components/layouts/Backdrop';
import IconWrapper from '@/components/ui/IconWrapper';
import { newEventSchema } from '@/lib/zodSchemas';
import { Category } from '@prisma/client';
import { Input } from 'facu-ui';
import { Link } from 'next-view-transitions';
import React, { useState, useTransition } from 'react';
import { z } from 'zod';
export const NewEventPage = ({
  availableCategories,
}: {
  availableCategories: Category[];
}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState({
    title: { message: '', value: false },
    category: { message: '', value: false },
    eventStart: { message: '', value: false },
    eventEnd: { message: '', value: false },
    description: { message: '', value: false },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      title: { message: '', value: false },
      category: { message: '', value: false },
      eventStart: { message: '', value: false },
      eventEnd: { message: '', value: false },
      description: { message: '', value: false },
    });

    const formData = new FormData(e.currentTarget);

    const eventData = {
      title: formData.get('title') as string,
      categoryId: formData.get('category') as string,
      isPublic: formData.get('isPublic') === 'on',
      eventStart: formData.get('eventStart') as string,
      eventEnd: formData.get('eventEnd') as string,
      description: formData.get('description') as string,
      participants: formData.get('participants') as string,
    };

    try {
      newEventSchema.parse(eventData);
      const response = await createEvent(eventData);
      // TODO : cerrar el modal luego de crear el evento
      console.log(response);
    } catch (err) {
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
    <Backdrop>
      <div className="flex flex-col items-center justify-center p-5 mb-5 w-full max-w-[900px] mx-2 bg-light-ciel relative rounded-xl border-2 border-light-yellow dark:bg-dark-bg">
        <Link href="/events">
          <IconWrapper
            type="plus"
            strokeWidth={2}
            className="transform rotate-45 absolute right-[10px] top-[10px]"
          />
        </Link>
        {/* TODO: agregar el campo para la imagen */}
        <h1 className="text-2xl mb-5">Créer un éventement 🚀</h1>
        <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
          <Input
            className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
            type="text"
            name="title"
            placeholder="Titre du événement (max 100 caractères)"
            required={true}
            label="Titre"
            errorstyles={{ color: 'red', fontSize: '1rem' }}
            error={{
              message: error.title?.message,
              value: error.title?.value,
            }}
          />
          <fieldset className="flex justify-between gap-2 flex-wrap">
            <label htmlFor="category" className="text-xl flex flex-col gap-2">
              Catégorie
              <select
                className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
                name="category"
              >
                {availableCategories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="eventStart" className="text-xl flex flex-col gap-2">
              Commence le:
              <Input
                className="mt-[-5px] p-2 border-2 rounded-lg border-dark-bg dark:border-white"
                type="datetime-local"
                name="eventStart"
                placeholder="Date de début"
                errorstyles={{ color: 'red', fontSize: '1rem' }}
                error={{
                  message: error.eventStart?.message,
                  value: error.eventStart?.value,
                }}
              />
            </label>
            <label htmlFor="eventEnd" className="text-xl flex flex-col gap-2">
              Se termine le:
              <Input
                className="mt-[-5px] p-2 border-2 rounded-lg border-dark-bg dark:border-white"
                type="datetime-local"
                name="eventEnd"
                placeholder="Date de fin"
                errorstyles={{ color: 'red', fontSize: '1rem' }}
                error={{
                  message: error.eventEnd?.message,
                  value: error.eventEnd?.value,
                }}
              />
            </label>
          </fieldset>
          <label htmlFor="isPublic" className="text-xl flex gap-2 select-none">
            <input type="checkbox" name="isPublic" id="isPublic" />
            Partager l’événement avec toute la communauté
          </label>
          <textarea
            className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
            rows={10}
            name="description"
            placeholder="Description du événement (entre 30 et 1000 caractères 😉)"
          />
          {error.description?.value && (
            <span className="text-blue-500 text-[1.2rem] mx-auto">
              {error.description?.message}
            </span>
          )}
          <input
            className="inline-flex items-center justify-center px-4 py-1 border-2 text-lg rounded-lg bg-light-yellow text-dark-bg font-bold border-dark-bg  hover:shadow-lg  transition-transform duration-300 ease-in-out "
            type="submit"
          />
        </form>
      </div>
    </Backdrop>
  );
};
