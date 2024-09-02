import { handleNewConversationSubmit } from '@/actions/messagesServerActions/handleNewConversationSubmit';
import { SendMessageInput } from '@/components/forms/SendMessageInput';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

type RegisteredUsers = Pick<
  User,
  'id' | 'email' | 'name' | 'username' | 'image'
>;

const NewMessagePage: React.FC = async () => {
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
    <section className="flex flex-col items-start justify-start px-2 w-full h-full">
      <form
        action={handleNewConversationSubmit}
        className="w-full h-full flex flex-col pb-10 gap-3"
      >
        <input type="text" name="sujet" placeholder="Sujet" className="p-2" />
        <select name="userRecipientId" className="w-full p-2">
          <option value="">Destinataire</option>
          {registeredUsers?.map((user: any) => (
            <option value={user.id} key={user.id}>
              {/* TODO: add image and name */}
              {user.email}
            </option>
          ))}
        </select>
        {/* <div className="no-scrollbar flex flex-col gap-2 bg-dark-grey/20 w-full min-h-[500px] m-auto p-2 rounded-xl overflow-y-scroll scroll-smooth "></div> */}
        <SendMessageInput />
      </form>
    </section>
  );
};

export default NewMessagePage;
