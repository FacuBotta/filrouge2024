'use client';

import { Input } from 'facu-ui';
import Button from '../ui/Button';
import { updatePassword } from '@/actions/userServerActions/updatePassword';
import React, { useState } from 'react';

type PasswordFormProps = {
  id: string;
};
export default function PasswordForm ({ id }: PasswordFormProps) {
  const [error, setError] = useState({ password: { message: '', value: false } });

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    // compare passwords
    if (password !== confirmPassword) {
      setError({ password: { message: 'Les mots de passe ne correspondent pas', value: true } });
      return;
    }
    try {
      await updatePassword(formData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="flex flex-col w-[400px] items-center justify-center p-24 gap-2 bg-light-ciel" onSubmit={handlePasswordSubmit}>
      <input type="hidden" name="id" value={id} />
      <Input type="password" name="password" placeholder="Mot de passe" />
      <Input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" />
      {
        error.password?.value ? <p className="text-red-500">{error.password.message}</p> : null
      }
      <Button type="submit">Créer un mot de passe</Button>
    </form>
  );
}
