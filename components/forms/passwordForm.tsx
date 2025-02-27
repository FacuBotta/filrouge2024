'use client';

import { checkPassword } from '@/actions/userServerActions/checkPassword';
import { updatePassword } from '@/actions/userServerActions/updatePassword';
import { handleError } from '@/lib/zod/handleError';
import {
  passwordRegex,
  passwordRegexMessage,
  passwordSchema,
} from '@/lib/zod/zodSchemas';
import { getFormDataStringValue } from '@/utils/getFormDataValue';
import { Input, PasswordInput } from 'facu-ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import Button from '../ui/Button';

type PasswordFormProps = {
  id: string;
  isUpdate: boolean;
};
export default function PasswordForm({ id, isUpdate }: PasswordFormProps) {
  const { update, data: session } = useSession();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [passwordChecked, setPasswordChecked] = useState(!isUpdate);
  const [error, setError] = useState({
    password: { message: '', value: false },
    oldPassword: { message: '', value: false },
  });

  const checkOldPassword = async (password: string) => {
    if (!password) {
      setError({
        ...error,
        oldPassword: { message: 'Mot de passe manquant', value: true },
      });
      setPasswordChecked(false);
      return;
    }
    startTransition(async () => {
      if (!session?.user.email) {
        setError((prev) => ({
          ...prev,
          oldPassword: { message: 'Utilisateur non connecte', value: true },
        }));
        return;
      }
      try {
        passwordSchema.safeParse({ password });
        const result = await checkPassword({
          inputPassword: password,
          email: session.user.email,
        });
        if (!result) {
          setError((prev) => ({
            ...prev,
            oldPassword: {
              message: 'Ancien mot de passe incorrect',
              value: true,
            },
          }));
          setPasswordChecked(false);
        } else {
          setPasswordChecked(true);
          setError({
            password: { message: '', value: false },
            oldPassword: { message: '', value: false },
          });
        }
      } catch (error) {
        console.error('Error checking old password:', error);
        setError((prev) => ({
          ...prev,
          oldPassword: {
            message: 'Erreur lors de la vérification',
            value: true,
          },
        }));
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      password: { message: '', value: false },
      oldPassword: { message: '', value: false },
    });
    if (!passwordChecked) {
      setError({
        ...error,
        oldPassword: { message: 'Mot de passe manquant', value: true },
      });
    }

    const formData = new FormData(e.currentTarget);

    const password = getFormDataStringValue(formData, 'password');
    const confirmPassword = getFormDataStringValue(formData, 'confirmPassword');

    if (password !== confirmPassword) {
      setError({
        ...error,
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
        if (result?.ok) {
          await update({ hasPassword: true });
          router.push('/profile');
          toast.success('Mot de passe modifié');
        } else {
          setError({
            ...error,
            password: { message: result?.message as string, value: true },
          });
        }
      });
    } catch (error) {
      const errorHandled = handleError(error);
      console.log({ errorHandled });
      setError({
        password: {
          message: errorHandled.message,
          value: true,
        },
        oldPassword: { message: '', value: false },
      });
    }
  };

  return (
    <form className="primary-form" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />

      {isUpdate && (
        <Input
          className="primary-input"
          autoFocus={isUpdate}
          onBlur={(e) => checkOldPassword(e.target.value)}
          required={true}
          label="Ancien mot de passe"
          type="password"
          name="oldPassword"
          placeholder="Mot de passe"
          disabled={isPending}
          autoComplete="current-password"
          success={{
            message: 'Mot de passe vérifié',
            value: passwordChecked,
          }}
          error={{
            message: error.oldPassword?.message,
            value: error.oldPassword?.value,
          }}
        />
      )}

      <PasswordInput
        autoFocus={!isUpdate}
        regexp={{
          message: passwordRegexMessage,
          pattern: passwordRegex,
        }}
        label="Nouveau mot de passe"
        className="primary-input"
        name="password"
        placeholder="Nouveau mot de passe"
        disabled={!passwordChecked}
      />
      <PasswordInput
        disabled={!passwordChecked}
        className="primary-input"
        label="Confirmer le mot de passe"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        error={{
          message: error.password?.message,
          value: error.password?.value,
        }}
      />
      <Button type="submit" disabled={isPending || !passwordChecked}>
        {isUpdate ? 'Modifier mot de passe' : 'Créer un mot de passe'}
      </Button>
    </form>
  );
}
