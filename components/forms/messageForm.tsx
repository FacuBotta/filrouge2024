
import { handleMessageSendSubmit } from "@/actions/messagesServerActions/handleMessageSendSubmit";
import prisma from "@/lib/prisma";

export const MessageForm: React.FC = async () => {
  const usersRegistres = await prisma.user.findMany();
  console.log(usersRegistres);

  return (
    <form action={ handleMessageSendSubmit }>
      <select name="userRecipientId">
        <option value=''>Select a user</option>
        {usersRegistres.map((user) => (
          <option value={user.id} key={user.id}>{user.email}</option>
        ))}
      </select>
      <input name="sujet" type="text" placeholder="sujet" />
      <input name="message" type="text" placeholder="message" />
      <button>Send</button>
    </form>
  );
}