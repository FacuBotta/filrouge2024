'use server';
import { auth } from '@/lib/auth/authConfig';
import { getConversationByIdService } from '@/services/conversationServices';
import { Conversation } from '@/types/types';

// TODO:  unused
export const getConversationById = async (conversationId: string) => {
  const session = await auth();
  if (!session) {
    console.error('getConversationById: no session found');
    return;
  }
  const conversation: Conversation | null =
    await getConversationByIdService(conversationId);

  if (!conversation) {
    return { ok: false, message: 'Conversation not found' };
  }
  const isParticipant = conversation?.participants?.some(
    (participant) => participant?.id === session.user.id
  );
  if (!isParticipant) {
    return { ok: false, message: 'Forbidden' };
  }
  const userRole = conversation?.participants?.find(
    (participant) => participant?.id === session.user.id
  )?.role;

  // Adapter
  const formattedConversation = {
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    role: userRole,
    messages: conversation.messages?.map((message) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      sender: {
        id: message.sender.id,
        username: message.sender.username,
        email: message.sender.email,
        image: message.sender.image,
        updatedAt: message.sender.updatedAt,
      },
    })),
  };

  return formattedConversation as Conversation;
};
