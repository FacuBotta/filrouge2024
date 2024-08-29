import { handleMessageSendSubmit } from '@/actions/messagesServerActions/handleMessageSendSubmit';
import React from 'react';
import prisma from '@/lib/prisma';

export const MessageForm: React.FC = async () => {
  const usersRegistres = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      image: true,
    },
  });

  return (
    <form action={handleMessageSendSubmit}>
      <select name="userRecipientId">
        <option value="">Select a user</option>
        {usersRegistres?.map((user) => (
          <option value={user.id} key={user.id}>
            {user.email}
          </option>
        ))}
      </select>
      <input name="sujet" type="text" placeholder="sujet" />
      <input name="message" type="text" placeholder="message" />
      <button>Send</button>
    </form>
  );
};
