'use client';

import { deleteProfile } from '@/actions/userServerActions/deleteProfile';
import { passwordSchema } from '@/lib/zod/zodSchemas';
import { getFormDataStringValue } from '@/utils/getFormDataValue';
import { Input } from 'facu-ui';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';

export default function DeleteProfileForm({ id }: { id: string }) {
  const [error, setError] = useState({ message: '', value: false });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const password = getFormDataStringValue(formData, 'password');
      if (!password) {
        setError({ message: 'Mot de passe manquant', value: true });
      }
      passwordSchema.parse({ password });
      const response = await deleteProfile(formData);
      if (response?.ok) {
        toast.success(response.message);
        signOut({ callbackUrl: '/' });
      } else {
        toast.error(response.message);
        setError({ message: response.message, value: true });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error('Mot de passe invalide');
        setError({ message: 'Mot de passe invalide', value: true });
        return;
      }
      toast.error('Une erreur est survenue');
    }
  };
  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-5"
      onSubmit={handleSubmit}
    >
      <input type="text" className="hidden" name="id" defaultValue={id} />
      <Input
        label="Mot de passe"
        required={true}
        type="password"
        name="password"
        placeholder="Votre mot de passe"
        className="primary-input"
        defaultValue=""
        error={{
          message: error.message,
          value: error.value,
        }}
      />
      <button type="submit" className="secondary-btn w-full">
        Supprimer mon compte
      </button>
    </form>
  );
}
