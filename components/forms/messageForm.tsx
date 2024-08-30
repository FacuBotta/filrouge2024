import { handleMessageSendSubmit } from '@/actions/messagesServerActions/handleMessageSendSubmit';
import React from 'react';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

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
      <div className="flex gap-2 w-[80%] m-auto">
        <select name="userRecipientId">
          <option value="">Select a user</option>
          {registeredUsers?.map((user) => (
            <option value={user.id} key={user.id}>
              {/* TODO: add image and name */}
              {user.email}
            </option>
          ))}
        </select>
        <input name="sujet" type="text" placeholder="sujet" />
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
