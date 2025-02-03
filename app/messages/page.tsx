import { getUserConversations } from '@/actions/messagesServerActions/getUserConversations';
import { auth } from '@/lib/auth/authConfig';
import React from 'react';
import MessagePage from './MessagePage';

const MessagesPage = async (): Promise<React.JSX.Element | null> => {
  const conversations = (await getUserConversations()) || [];
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  return (
    <MessagePage userId={session?.user?.id} conversations={conversations} />
  );
};

export default MessagesPage;
