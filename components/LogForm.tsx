'use client';

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { Icon, Input } from "facu-ui";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { handleEmailSignIn } from "@/lib/auth/emailSignInServerAction";
import Link from "next/link";
import selectUserByMail from "@/lib/userServerActions/selectUserByMail";

export default function LogForm() {
  const Router = useRouter();
  const [formType, setFormType] = useState<string>('Sign-In');
  const [isPending, startTransition] = useTransition();
  const [conditionsAccepted, setConditionsAccepted] = useState(false); 
  const [error, setError] = useState({ mail: { message: '', value: false }, password: { message: '', value: false }, conditions: { message: '', value: false } });
  console.log(error.mail);
  const handleLogInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get('email'));
    console.log(formData.get('password'));
    
  };
  const handleGoogleSignInSubmit = async () => {
    try {
      await handleGoogleSignIn();
    } catch (error) {
      console.error(error);
    }
  }
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
        if (result?.error.value) {
          setError({ ...error, mail: { message: result.error.message, value: true } });
          return;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const inputClasses = "bg-light-grey dark:bg-dark-bg border-[1px] p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow";

  return (
    <form
      className="relative flex flex-col items-center gap-3 w-full max-w-md p-5 bg-light-blue border border-light-yellow dark:bg-dark-bg"
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
        error={{ message: error.mail?.message, value: error.mail?.value }}
      />
      {
        formType === 'Sign-In' ? (
          <Input
            regexp={{ message: 'Characters @ - _ ; " \' are not allowed', pattern: /[@-_;"']/ }}
            className={inputClasses}
            required={true}
            label="Mot de passe"
            type="password"
            name="password"
            placeholder="Password"
            disabled={isPending}
            error={{ message: error.password?.message, value: error.password?.value }}
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
        {formType === 'Sign-Up' ? "Vous Avez déjà un compte ?" : "Vous n'avez pas de compte ?"}
      </p>
    </form>
  );
}