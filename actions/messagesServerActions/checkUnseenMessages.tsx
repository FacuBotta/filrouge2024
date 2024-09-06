'use server';
import prisma from '@/lib/prisma';

export async function checkUnseenMessages(userId: string) {
  const unseenMessages = await prisma.messageStatus.findMany({
    where: {
      userId: userId,
      status: 'UNSEEN',
    },
  });
  return unseenMessages.length;
}
