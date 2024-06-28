import Button from "./Button";

export default function LogForm() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    for (const data of Object.entries(formData)) {
      console.log(data);
    }
  };

  
  return (
    <form 
      className="flex flex-col items-center justify-center w-full max-w-md p-7 bg-light-blue border border-light-yellow dark:bg-dark-bg"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <Button type="submit">log</Button>
    </form>
  );
}
