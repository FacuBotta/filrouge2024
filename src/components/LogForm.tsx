
export default function LogForm() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    for (const data of Object.entries(formData)) {
      console.log(data);
    }
  };
  return (
    <form 
      className="flex flex-col items-center justify-center w-full max-w-md p-7 mx-auto bg-light-grey absolute top-center"
      // onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
