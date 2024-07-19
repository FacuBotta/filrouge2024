import Button from "./Button";
import { Input } from "facu-ui";

export default function LogForm({type}: {type: string}) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const inputClasses = "bg-light-grey test-current dark:bg-dark-bg border-[1px] p-2 border-light-blue dark:border-dark-grey focus:border-light-yellow  focus:dark:border-light-yellow";
  return (
    <form
    className="flex flex-col items-center w-full max-w-md p-5 bg-light-blue border border-light-yellow dark:bg-dark-bg"
    >
      <h2 className="text-2xl font-bold text-center">{type}</h2>
      
      <input type="text" placeholder="name" />
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />

      <Button width='100%' type="submit">{type === 'Sign-In' ? 'log in' : 'sign up'}</Button>
      <p
        className="mt-4 text-[1rem] cursor-pointer hover:underline"
      >
        Ou vous pouvez initier avec votre compte <strong>Google</strong></p>
      <p 
        className="text-[1rem] mt-1 cursor-pointer hover:underline"
      >
        {type === 'Sign-In' ? "Vous Avez déjà un compte ?" : "Vous n'avez pas de compte ?"}
      </p>
    </form>
  );
}
