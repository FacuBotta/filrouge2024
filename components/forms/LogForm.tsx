'use client';

import { handleCredentialsSignIn } from '@/actions/authServerActions/CredentialsLoginServerAction';
import { emailSignInServerAction } from '@/actions/authServerActions/emailSignInServerAction';
import { handleGoogleSignIn } from '@/actions/authServerActions/googleSignInServerAction';
import { Icon, Input } from 'facu-ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import Button from '../ui/Button';

import { loginSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export default function LogForm() {
  const Router = useRouter();
  const [formType, setFormType] = useState<string>('Sign-In');
  const [isPending, startTransition] = useTransition();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [conditionsAccepted, setConditionsAccepted] = useState(false);
  const [error, setError] = useState({
    mail: { message: '', value: false },
    password: { message: '', value: false },
    conditions: { message: '', value: false },
  });

  // Login with credentials
  // TODO: sometimes give a render error. to many renders...
  interface InputsData {
    email: string;
    password: string;
  }
  const handleLogInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reiniciar todos los errores al inicio
    setError({
      mail: { message: '', value: false },
      password: { message: '', value: false },
      conditions: { message: '', value: false },
    });

    const formData = new FormData(e.currentTarget);
    const inputsData: InputsData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      // Validar los datos de entrada
      loginSchema.parse(inputsData);

      // Llamar a la función de inicio de sesión
      const response = await handleCredentialsSignIn(formData);

      // Manejar la respuesta
      if (!response?.ok) {
        setError((prevError) => ({
          ...prevError,
          mail:
            response.typeError === 'email'
              ? { message: response.message as string, value: true }
              : prevError.mail,
          password:
            response.typeError === 'password'
              ? { message: response.message as string, value: true }
              : prevError.password,
        }));
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          const field = error.path[0]; // Tomar el primer campo de error
          if (field === 'email') {
            console.log(error);
            setError((prevError) => ({
              ...prevError,
              mail: { message: error.message, value: true },
            }));
          }
        });
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  // Login with Google link
  // TODO: handle the case where the user already exists
  const handleGoogleSignInSubmit = async () => {
    try {
      await handleGoogleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  // Sign up with email
  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      mail: { message: '', value: false },
      password: { message: '', value: false },
      conditions: { message: '', value: false },
    });
    if (!conditionsAccepted) {
      setError({
        ...error,
        conditions: {
          message: "Veuillez accepter les conditions d'utilisation",
          value: true,
        },
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    try {
      loginSchema.parse({ email });
      startTransition(async () => {
        const result = await emailSignInServerAction(email as string);
        if (!result?.ok) {
          setError({
            ...error,
            mail: { message: result?.message as string, value: true },
          });
          return;
        }
      });
      setEmailSent(true);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
          const field = error.path[0];
          if (field === 'email') {
            setError((prevError) => ({
              ...prevError,
              mail: { message: error.message, value: true },
            }));
          }
        });
      } else {
        setError((prevError) => ({
          ...prevError,
          mail: { message: 'Une erreur est survenue', value: true },
        }));
      }
    }
  };

  const inputClasses =
    'bg-light-grey dark:bg-dark-bg border-[1px] rounded-lg p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow focus:dark:border-light-yellow';

  return (
    <>
      {emailSent ? (
        <div className="relative flex flex-col text-center items-center gap-3 w-full max-w-md p-5 mx-2 bg-light-blue border rounded-lg border-light-yellow dark:bg-dark-bg">
          <h3 className="text-4xl font-bold mb-5">Mail envoyé !</h3>
          <p className="text-lg">Vérifie ton e-mail pour activer ton compte.</p>
          <p>Tu peux fermer cette page.</p>
        </div>
      ) : (
        <form
          className="relative flex flex-col items-center gap-3 w-full max-w-md p-5 mx-2 bg-light-blue border rounded-lg border-light-yellow dark:bg-dark-bg"
          onSubmit={
            formType === 'Sign-Up' ? handleSignUpSubmit : handleLogInSubmit
          }
        >
          <Icon
            type="plus"
            strokeWidth={2}
            onClick={() => Router.back()}
            className="absolute right-[10px] top-[10px] cursor-pointer rotate-45"
          />
          <h2 className="text-2xl mb-3 font-bold text-center">
            {formType === 'Sign-In'
              ? 'Content de te revoir !'
              : 'Bienvenue sur EventHub !'}
          </h2>
          <Input
            className={inputClasses}
            required={true}
            label={
              formType === 'Sign-In'
                ? 'Email'
                : "On va t'envoyer un mail de confirmation !"
            }
            type="email"
            id="Email"
            name="email"
            placeholder="Email"
            disabled={isPending}
            autoComplete="email"
            // errorStyles={{ color: 'red', fontSize: '1rem' }}
            error={{ message: error.mail?.message, value: error.mail?.value }}
          />
          {formType === 'Sign-In' ? (
            <Input
              regexp={{
                message: 'Characters @ - _ ; " \' are not allowed',
                pattern: /[@-_;"']/,
              }}
              className={inputClasses}
              required={true}
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="Password"
              disabled={isPending}
              autoComplete="current-password"
              // errorStyles={{ color: 'red', fontSize: '1rem' }}
              error={{
                message: error.password?.message,
                value: error.password?.value,
              }}
            />
          ) : (
            <>
              <label htmlFor="terms" className="flex gap-2">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={conditionsAccepted}
                  onChange={() => setConditionsAccepted(!conditionsAccepted)}
                />
                J&apos;accepte les{' '}
                <Link href="/about" className="underline">
                  Conditions d&apos;utilisation
                </Link>
              </label>
              {error.conditions?.value && !conditionsAccepted && (
                <span className="text-[red] text-[1rem]">
                  {error.conditions?.message}
                </span>
              )}
            </>
          )}
          <Button width="100%" type="submit">
            {formType === 'Sign-In'
              ? 'Se connecter'
              : isPending
                ? 'Envoi du mail...'
                : "S'inscrire"}
          </Button>
          {formType === 'Sign-In' && (
            <>
              <p
                className="mt-4 text-[1rem] select-none cursor-pointer hover:underline"
                onClick={() => handleGoogleSignInSubmit()}
              >
                Ou initier avec votre compte <strong>Google</strong>
              </p>
              <p className="text-[1rem] select-none cursor-pointer hover:underline">
                Mot de passe oublié ?
              </p>
            </>
          )}
          <p
            className="text-[1rem] mt-1 cursor-pointer select-none hover:underline"
            onClick={() =>
              setFormType(formType === 'Sign-In' ? 'Sign-Up' : 'Sign-In')
            }
          >
            {formType === 'Sign-Up'
              ? 'Tu as déjà un compte ?'
              : "Tu n'as pas encore de compte ?"}
          </p>
        </form>
      )}
    </>
  );
}
