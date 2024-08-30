import React from 'react';
import { getUserMessages } from '@/actions/messagesServerActions/getUserMessages';
import { getUserConversations } from '@/actions/messagesServerActions/getUserConversations';

const MessagePage: React.FC = async () => {
  const messages = (await getUserMessages()) || [];
  const conversations = (await getUserConversations()) || [];

  return (
    <div className="flex min-w-full min-h-screen bg-light-ciel">
      messages page
    </div>
  );
};

export default MessagePage;
