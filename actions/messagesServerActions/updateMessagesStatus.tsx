'use server';
import prisma from '@/lib/prisma';

export async function updateMessagesStatus({
  user_id,
  conversation_id,
}: {
  user_id: string;
  conversation_id: string;
}) {
  await prisma.messageStatus.updateMany({
    where: {
      userId: user_id,
      message: {
        conversationId: conversation_id,
      },
      status: 'UNSEEN',
    },
    data: {
      status: 'SEEN',
    },
  });
}
