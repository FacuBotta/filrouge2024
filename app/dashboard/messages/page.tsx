import { getUserConversations } from '@/actions/messagesServerActions/getUserConversations';
import React from 'react';
import MessagePage from './MessagePage';
import { auth } from '@/lib/auth/authConfig';

const MessagesPage = async (): Promise<React.JSX.Element> => {
  const conversations = (await getUserConversations()) || [];
  const session = await auth();
  console.log(conversations);

  return <MessagePage session={session} conversations={conversations} />;
};

export default MessagesPage;
