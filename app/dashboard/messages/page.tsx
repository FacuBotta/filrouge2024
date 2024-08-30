import React from 'react';
import { getUserMessages } from '@/actions/messagesServerActions/getUserMessages';
import { getUserConversations } from '@/actions/messagesServerActions/getUserConversations';

const MessagePage: React.FC = async () => {
  const messages = (await getUserMessages()) || [];
  const conversations = (await getUserConversations()) || [];

  return <section className="flex min-h-screen ">messages page</section>;
};

export default MessagePage;
