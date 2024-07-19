import { useRef, useState } from "react";
import Button from "./Button";
import { Icon, Input } from "facu-ui";

type LogFormProps = {onClick?: () => void}

export default function LogForm({onClick}: LogFormProps) {
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
    for (const data of Object.entries(formData)) {
      console.log(data);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const inputClasses = "bg-light-grey test-current dark:bg-dark-bg border-[1px] p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow";

  return (
    <form
    className="relative flex flex-col items-center w-full max-w-md p-5 bg-light-blue border border-light-yellow dark:bg-dark-bg"
    onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <Icon type="plus" onClick={onClick} className="absolute right-[10px] top-[10px] cursor-pointer hover:invert"/>
      <h2 className="text-2xl font-bold text-center">{formType === 'Sign-In' ? 'log in' : 'sign up'}</h2>
      <Input className={inputClasses} required={true} error={{message: 'errorcito', value: false}}  label="Nom" ref={nameRef} type="text" id="name" name="name" placeholder="Name"/>
      <Input className={inputClasses} required={true} label="Email" ref={emailRef} type="email" id="Email" name="email" placeholder="Email"/>
      <Input
        regexp={{message: 'Characters @ - _ ; " \' are not allowed', pattern: /[@-_;"']/ }}
        className={inputClasses}
        required={true}
        label="Mot de passe"
        ref={passwordRef}
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => handleChange(e)}
      />
      <Button width='100%' type="submit">{formType === 'Sign-In' ? 'log in' : 'sign up'}</Button>
      <p
        className="mt-4 text-[1rem] cursor-pointer hover:underline"
      >
        Ou vous pouvez initier avec votre compte <strong>Google</strong></p>
      <p 
        className="text-[1rem] mt-1 cursor-pointer hover:underline"
      >
        {formType === 'Sign-In' ? "Vous Avez déjà un compte ?" : "Vous n'avez pas de compte ?"}
      </p>
    </form>
  );
}
