'use client';

import { updatePassword } from '@/actions/userServerActions/updatePassword';
import { passwordRegex, passwordSchema } from '@/lib/zodSchemas';
import { PasswordInput } from 'facu-ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import Button from '../ui/Button';

type PasswordFormProps = {
  id: string;
  isUpdated: boolean;
};
export default function PasswordForm({ id, isUpdated }: PasswordFormProps) {
  const router = useRouter();
  const { update } = useSession();

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

    const password: string = formData
      .get('password')
      ?.toString()
      .trim() as string;

    const confirmPassword: string = formData
      .get('confirmPassword')
      ?.toString()
      .trim() as string;

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
          await update({ hasPassword: true });
          router.push('/profile');
          toast.success('Mot de passe modifié');
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
      <PasswordInput
        regexp={{
          message:
            '8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial, \\\' \\" _ - ne sont pas autorisés',
          pattern: passwordRegex,
        }}
        label="Nouveau mot de passe"
        className="bg-light-grey dark:bg-dark-bg border-[1px] rounded-lg p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow"
        name="password"
        placeholder="Nouveau mot de passe"
        disabled={isPending}
      />
      <PasswordInput
        label="Confirmer le mot de passe"
        className="bg-light-grey dark:bg-dark-bg border-[1px] rounded-lg p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        disabled={isPending}
      />
      {error.password?.value ? (
        <p className="text-red-500">{error.password.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending}>
        {isUpdated ? 'Modifier mot de passe' : 'Créer un mot de passe'}
      </Button>
    </form>
  );
}
