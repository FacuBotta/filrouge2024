import { handleMessageSendSubmit } from '@/actions/messagesServerActions/handleMessageSendSubmit';
import React from 'react';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { UsersList } from '../ui/dashboard/usersList';

type RegisteredUsers = Pick<
  User,
  'id' | 'email' | 'name' | 'username' | 'image'
>;

export const MessageForm: React.FC = async () => {
  // Listing all the users registered in the app
  // Dev purpose only. this may be the list of contacts
  const registeredUsers: RegisteredUsers[] = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      image: true,
    },
  });

  return (
    <form action={handleMessageSendSubmit} className="text-center">
      <input type="checkbox" id="userList" className="hidden peer" />

      <label htmlFor="userList" className="cursor-pointer block mb-2">
        Toggle User List
      </label>
      <input name="sujet" type="text" placeholder="sujet" />
      <div className="hidden peer-checked:block">
        <UsersList users={registeredUsers} />
      </div>

      <div className="w-full mt-2">
        <textarea className="w-full p-2" name="message" placeholder="message" />
      </div>

      <button
        className="bg-light-yellow p-2 rounded-md w-[80%] m-auto"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};
