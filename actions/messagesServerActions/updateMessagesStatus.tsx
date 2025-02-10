'use server';
import prisma from '@/lib/prisma';
// TODO : delete messages from messagesStatus when seen ?
export async function updateMessagesStatus({
  userId,
  conversationId,
}: {
  userId: string;
  conversationId: string;
}) {
  await prisma.messageStatus.updateMany({
    where: {
      userId,
      message: {
        conversationId,
      },
      status: 'UNSEEN',
    },
    data: {
      status: 'SEEN',
    },
  });
}
