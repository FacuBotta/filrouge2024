'use server';

import { auth } from '@/lib/auth/authConfig';
import { selectConversationsByUserService } from '@/services/conversationServices';
import { Conversation } from '@/types/types';

export async function getConversationsByUser(): Promise<
  Conversation[] | [] | null
> {
  const { user } = (await auth()) || {};
  if (!user) {
    console.error('getConversationByUser: no sender found');
    // TODO : redirection
    return null;
  }
  try {
    const conversations = await selectConversationsByUserService(user.id);
    if (!conversations) {
      return [];
    }
    const formattedConversations: Conversation[] = conversations?.map(
      (conversation) => {
        const unreadMessages = conversation.messages.reduce(
          (count, message) => {
            return count + message.messageStatuses.length;
          },
          0
        );

        return {
          id: conversation.id,
          title: conversation.title,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
          event: conversation.event as { id: string; title: string },
          unreadMessages,
          messages: conversation.messages,
          participants: conversation.participants.map((participant) => ({
            id: participant.user.id,
            name: participant.user.name,
            username: participant.user.username,
            email: participant.user.email,
            image: participant.user.image,
            joinedAt: participant.joinedAt,
            updatedAt: participant.user.updatedAt,
            role: participant.role,
          })),
        };
      }
    );

    return formattedConversations;
  } catch (error) {
    console.error('getConversationsByUser action: error', error);
    return [];
  }
}
