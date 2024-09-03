import { getUserConversations } from '@/actions/messagesServerActions/getUserConversations';
import { ConversationsList } from '@/components/ui/dashboard/conversationsList';
import IconWrapper from '@/components/ui/IconWrapper';
import Link from 'next/link';
import React from 'react';

const MessagesLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> => {
  const conversations = (await getUserConversations()) || [];
  return (
    <section className="min-h-[95%] w-full flex items-start justify-start">
      <div className="flex flex-col gap-2 sm:w-[40%] h-[90%] p-3 border-r ">
        <div className="flex w-full items-center justify-between px-5 pb-2 border-b">
          <h2 className="text-2xl">Chats</h2>
          <Link href={'/dashboard/messages/new'}>
            <IconWrapper
              type="add"
              strokeWidth={2}
              width={50}
              className="hover:scale-110 transition-all ease-in-out "
            />
          </Link>
        </div>
        <ConversationsList conversations={conversations} />
      </div>
      {children}
    </section>
  );
};

export default MessagesLayout;
