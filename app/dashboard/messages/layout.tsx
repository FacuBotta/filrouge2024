import { getUserConversations } from '@/actions/messagesServerActions/getUserConversations';
import Link from 'next/link';
import React from 'react';

const MessagesLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> => {
  const conversations = (await getUserConversations()) || [];

  return (
    <main className="min-h-screen w-full flex items-start justify-start gap-2">
      <div className="flex flex-col gap-2 bg-light-ciel dark:bg-dark-bg w-[40%] min-h-full dark:border dark:border-dark-greenLight">
        <div className="">
          <h2>Conversations</h2>
          <Link href={'/dashboard/messages/new'} className="border bg-gray-400">
            New conversation
          </Link>
        </div>
        <form action="createConvertation"></form>
        {conversations?.map((conversation) => (
          <Link
            href={`/dashboard/messages/${conversation.id}`}
            className="border m-2 p-2 bg-gray-400"
          >
            <p>{conversation.title}</p>
            <span className="font-extralight text-sm">
              {conversation.updatedAt.toLocaleDateString()}
            </span>
          </Link>
        ))}
      </div>
      <section className="w-full ">{children}</section>
    </main>
  );
};

export default MessagesLayout;
