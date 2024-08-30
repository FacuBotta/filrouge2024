import { getUserConversations } from '@/actions/messagesServerActions/getUserConversations';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MessagesLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> => {
  const conversations = (await getUserConversations()) || [];
  console.log(
    'conversations from messages layout',
    conversations[0].participants[1].user.image
  );
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
        <form action="createConvertation"></form>
        {conversations?.map((conversation) => (
          <div className="border m-2 p-2 bg-gray-400/50 rounded-lg flex justify-between">
            <Link href={`/dashboard/messages/${conversation.id}`}>
              <p>{conversation.title}</p>
              <span className="font-extralight text-sm">
                {conversation.updatedAt.toLocaleDateString()}
              </span>
            </Link>
            <div className="flex gap-2">
              {conversation.participants.map((participant) => (
                <img
                  alt="user avatar mx-[-17px]"
                  src={participant?.user?.image || ''}
                  className="size-14 rounded-full border "
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <section className="border-l p-3 sm:w-[70%] min-h-screen">
        {children}
      </section>
    </main>
  );
};

export default MessagesLayout;
