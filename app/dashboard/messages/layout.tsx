import { getUserConversations } from '@/actions/messagesServerActions/getUserConversations';
import { ConversationsList } from '@/components/ui/dashboard/conversationsList';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MessagesLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> => {
  const conversations = (await getUserConversations()) || [];
  /* console.log(
    'conversations from messages layout',
    conversations[0].participants[1].user.image
  ); */
  return (
    <main className="min-h-screen w-full flex items-start justify-start bg-light-ciel dark:bg-dark-grey/20">
      <div className="flex flex-col gap-2 sm:w-[30%] min-h-full p-3 ">
        <div className="">
          <h2>Conversations</h2>
          <Link
            href={'/dashboard/messages/new'}
            className="border bg-gray-400 rounded-sm"
          >
            New conversation
          </Link>
        </div>
        <ConversationsList conversations={conversations} />
      </div>
      <section className="border-l p-3 sm:w-[70%] min-h-screen">
        {children}
      </section>
    </main>
  );
};

export default MessagesLayout;
