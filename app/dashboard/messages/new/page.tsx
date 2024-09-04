import prisma from '@/lib/prisma';
import { NewMessagePage } from './NewMessagePage';
import { RegisteredUsers } from '@/types/types';
import { auth } from '@/lib/auth/authConfig';

export default async function NewMessagePagePage() {
  // Listing all the users registered in the app
  const session = await auth();
  const registeredUsers: RegisteredUsers[] = await prisma.user.findMany({
    where: {
      id: {
        not: session?.user?.id,
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      image: true,
    },
  });

  return <NewMessagePage users={registeredUsers} />;
}
