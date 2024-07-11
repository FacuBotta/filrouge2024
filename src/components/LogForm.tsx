import { useRef } from "react";
import Button from "./Button";
import { Input } from "facu-ui";
export default function LogForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
  const inputClasses = "bg-light-grey text-dark-bg dark:text-dark-grey dark:bg-dark-bg border-[1px] p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-dark-yellowLight";
  return (
    <form 
      className="flex flex-col  w-full max-w-md p-7 bg-light-blue border border-light-yellow dark:bg-dark-bg"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
      <Input className={inputClasses} required={true} error={{message: 'errorcito', value: false}}  label="Nom" ref={nameRef} type="text" id="name" name="name" placeholder="Name"/>
      <Input className={inputClasses} required={true} label="Email" ref={emailRef} type="email" id="Email" name="email" placeholder="Email"/>
      <Input className={inputClasses} required={true} label="Mot de passe" ref={passwordRef} type="password" id="password" name="password" placeholder="Password"/>
      <br></br>
      <Button type="submit">log</Button>
    </form>
  );
}
