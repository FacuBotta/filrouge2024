'use client';

import { Input } from 'facu-ui';
import Button from '../ui/Button';
import { updatePassword } from '@/actions/userServerActions/updatePassword';
import React, { useState, useTransition } from 'react';
import { passwordSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

type PasswordFormProps = {
  id: string;
  isUpdated: boolean;
};
export default function PasswordForm({ id, isUpdated }: PasswordFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState({
    password: { message: '', value: false },
  });

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      password: { message: '', value: false },
    });

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError({
        password: {
          message: 'Les mots de passe ne correspondent pas',
          value: true,
        },
      });
      return;
    }
    try {
      passwordSchema.parse({ password });
      startTransition(async () => {
        const result = await updatePassword(formData);
        if (!result?.ok) {
          setError({
            password: { message: result?.message as string, value: true },
          });
        } else if (result.ok) {
          router.push('/dashboard');
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        const field = firstError.path[0];
        if (field === 'password') {
          setError({
            password: { message: firstError.message, value: true },
          });
        }
      } else {
        console.error(error);
      }
    }
  };
  return (
    <form
      className="relative flex flex-col items-center gap-3 w-full max-w-md p-5 mx-2 bg-light-blue border rounded-lg border-light-yellow dark:bg-dark-bg"
      onSubmit={handlePasswordSubmit}
    >
      <input type="hidden" name="id" value={id} />
      <Input
        className="bg-light-grey dark:bg-dark-bg border-[1px] rounded-lg p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow"
        type="password"
        name="password"
        placeholder="Mot de passe"
        disabled={isPending}
      />
      <Input
        className="bg-light-grey dark:bg-dark-bg border-[1px] rounded-lg p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow"
        type="password"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        disabled={isPending}
      />
      {error.password?.value ? (
        <p className="text-red-500">{error.password.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending}>
        {isUpdated ? 'Modifier mon mot de passe' : 'Créer un mot de passe'}
      </Button>
    </form>
  );
}
