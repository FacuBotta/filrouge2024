"use client";

import { User } from "@prisma/client";

// import { handleSubmit } from "@/actions/formActions/sendMessageServerAction";
// import prisma from "@/lib/prisma";


export const MessageForm: React.FC<User> = (user: User) => {
  // const usersRegistres = await prisma.user.findMany();
  console.log(user);
  /* const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userId = formData.get("users") as string;
    console.log("userID: ", userId);
  }; */

  return (
    <form method="post">
      {/* <select name="users">
        <option value=''>Select a user</option>
        {usersRegistres.map((user) => (
          <option value={user.id} key={user.id}>{user.email}</option>
        ))}
      </select> */}
      <input type="text" placeholder="message" />
      <input type="submit" value="Send" />
    </form>
  );
}