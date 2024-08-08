'use client';

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { Icon, Input } from "facu-ui";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";

export default function LogForm() {
  const Router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [formType, setFormType] = useState<string>('Sign-In');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(nameRef.current?.value);
    console.log(emailRef.current?.value);
    console.log(passwordRef.current?.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const inputClasses = "bg-light-grey dark:bg-dark-bg border-[1px] p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow";

  return (
    <form
      className="relative flex flex-col items-center gap-3 w-full max-w-md p-5 bg-light-blue border border-light-yellow dark:bg-dark-bg"
      onSubmit={handleSubmit}
    >
      <Icon
        type="plus"
        strokeWidth={2}
        onClick={() => Router.back()}
        className="absolute right-[10px] top-[10px] cursor-pointer rotate-45"
      />
      <h2 className="text-2xl mb-3 font-bold text-center">{formType === 'Sign-In' ? 'Content de te revoir !' : 'Bienvenue sur EventHub !'}</h2>
      <Input className={inputClasses} required={true} error={{ message: 'errorcito', value: false }} label="Nom" ref={nameRef} type="text" id="name" name="name" placeholder="Name" />
      { formType === 'Sign-Up' ? 
        (
          <Input className={inputClasses} required={true} label="Email" ref={emailRef} type="email" id="Email" name="email" placeholder="Email" />
        ) 
      : 
        (
          <Input
            regexp={{ message: 'Characters @ - _ ; " \' are not allowed', pattern: /[@-_;"']/ }}
            className={inputClasses}
            required={true}
            label="Mot de passe"
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        )
      }
      <Button width='100%' type="submit">{formType === 'Sign-In' ? 'log in' : 'sign up'}</Button>
      <p
        className="mt-4 text-[1rem] select-none cursor-pointer hover:underline"
        onClick={() => handleGoogleSignIn()}
      >
        Ou vous pouvez initier avec votre compte <strong>Google</strong></p>
      <p
        className="text-[1rem] mt-1 cursor-pointer select-none hover:underline"
        onClick={() => setFormType(formType === 'Sign-In' ? 'Sign-Up' : 'Sign-In')}
      >
        {formType === 'Sign-Up' ? "Vous Avez déjà un compte ?" : "Vous n'avez pas de compte ?"}
      </p>
    </form>
  );
}