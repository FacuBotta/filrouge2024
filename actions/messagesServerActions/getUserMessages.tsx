import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';

export async function getUserMessages() {
  const { user } = (await auth()) || {};
  if (!user?.id) {
    console.error('getUserMessages: no user found');
    return;
  }
  const messages = await prisma.message.findMany({
    where: {
      senderId: user.id,
    },
  });

  return messages;
}
