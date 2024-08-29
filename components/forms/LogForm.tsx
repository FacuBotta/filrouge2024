'use client';

import React, { useState, useTransition } from 'react';
import { handleGoogleSignIn } from '@/actions/authServerActions/googleSignInServerAction';
import { handleEmailSignIn } from '@/actions/authServerActions/emailSignInServerAction';
import { handleCredentialsSignIn } from '@/actions/authServerActions/CredentialsLoginServerAction';
import { useRouter } from 'next/navigation';
import { Icon, Input } from 'facu-ui';
import Button from '../ui/Button';
import Link from 'next/link';

export default function LogForm () {
  const Router = useRouter();
  const [formType, setFormType] = useState<string>('Sign-In');
  const [isPending, startTransition] = useTransition();
  const [conditionsAccepted, setConditionsAccepted] = useState(false);
  const [error, setError] = useState({ mail: { message: '', value: false }, password: { message: '', value: false }, conditions: { message: '', value: false } });

  // Login with credentials
  // TODO: sometimes give a render error. to many renders...
  const handleLogInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await handleCredentialsSignIn(formData);
    if (!response?.ok) {
      console.log(response);
      if (response?.typeError === 'email') {
        setError({ ...error, mail: { message: response?.message as string, value: true } });
      } else if (response?.typeError === 'password') {
        setError({ ...error, password: { message: response?.message as string, value: true } });
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
    if (!conditionsAccepted) {
      setError({ ...error, conditions: { message: 'Veuillez accepter les conditions d\'utilisation', value: true } });
      return;
    }
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    try {
      startTransition(async () => {
        const result = await handleEmailSignIn(email as string);
        if (!result?.ok) {
          console.log(result);
          setError({ ...error, mail: { message: result?.message as string, value: true } });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const inputClasses = 'bg-light-grey dark:bg-dark-bg border-[1px] p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow';

  return (
    <form
      className="relative flex flex-col items-center gap-3 w-full max-w-md p-5 mx-2 bg-light-blue border border-light-yellow dark:bg-dark-bg"
      onSubmit={formType === 'Sign-Up' ? handleSignUpSubmit : handleLogInSubmit}
    >
      <Icon
        type="plus"
        strokeWidth={2}
        onClick={() => Router.back()}
        className="absolute right-[10px] top-[10px] cursor-pointer rotate-45"
      />
      <h2 className="text-2xl mb-3 font-bold text-center">{formType === 'Sign-In' ? 'Content de te revoir !' : 'Bienvenue sur EventHub !'}</h2>
      <Input
        className={inputClasses}
        required={true}
        label={formType === 'Sign-In' ? 'Email' : 'On va te envoyer un mail de confirmation !'}
        type="email"
        id="Email"
        name="email"
        placeholder="Email"
        disabled={isPending}
        autoComplete="email"
        error={{ message: error.mail?.message, value: error.mail?.value }}
      />
      {
        formType === 'Sign-In'
          ? (
          <Input
            regexp={{ message: 'Characters @ - _ ; " \' are not allowed', pattern: /[@-_;"']/ }}
            className={inputClasses}
            required={true}
            label="Mot de passe"
            type="password"
            name="password"
            placeholder="Password"
            disabled={isPending}
            autoComplete="current-password"
            error={{ message: error.password?.message, value: error.password?.value }}
          />
            )
          : (
          <>
            <label htmlFor="terms" className="flex gap-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={conditionsAccepted}
                onChange={() => setConditionsAccepted(!conditionsAccepted)}
              />
              J&apos;accepte les <Link href='/about' className="underline">Conditions d&apos;utilisation</Link>
            </label>
            {error.conditions?.value && !conditionsAccepted && (
              <span className="text-red-500 text-sm">{error.conditions?.message}</span>
            )}
          </>
            )
      }
      <Button width='100%' type="submit">{formType === 'Sign-In' ? 'Se connecter' : "S'inscrire"}</Button>
      {
        formType === 'Sign-In' && (
          <>
          <p
            className="mt-4 text-[1rem] select-none cursor-pointer hover:underline"
            onClick={() => handleGoogleSignInSubmit()}
            >
            Ou initier avec votre compte <strong>Google</strong>
          </p>
          <p className="text-[1rem] select-none cursor-pointer hover:underline">Mot de passe oublié ?</p>
          </>
        )
      }
      <p
        className="text-[1rem] mt-1 cursor-pointer select-none hover:underline"
        onClick={() => setFormType(formType === 'Sign-In' ? 'Sign-Up' : 'Sign-In')}
      >
        {formType === 'Sign-Up' ? 'Vous Avez déjà un compte ?' : "Vous n'avez pas de compte ?"}
      </p>
    </form>
  );
}
