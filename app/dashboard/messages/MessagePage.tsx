'use client';

import React, { useState } from 'react';
import { Conversation } from '@/types/types';
import { ConversationsList } from '@/components/ui/dashboard/conversationsList';
import IconWrapper from '@/components/ui/IconWrapper';
import Link from 'next/link';
import { handleMessageSendSubmit } from '@/actions/messagesServerActions/handleMessageSendSubmit';
import DashboardMessagesWindow from '@/components/ui/dashboard/DashboardMessagesWindow';
import { SendMessageInput } from '@/components/forms/SendMessageInput';
import { handleDeleteConversation } from '@/actions/messagesServerActions/handleDeleteConversation';

export default function MessagePage({
  session,
  conversations,
}: {
  session: any;
  conversations: Conversation[];
}) {
  const [currentConversation, setCurrentConversation] = useState<Conversation>(
    conversations[0]
  );
  /* // actualize the status of the messages in this conversation to SEEN
  await prisma.messageStatus.updateMany({
    where: {
      userId: session?.user?.id,
      message: {
        conversationId: currentConversation.id,
      },
      status: 'UNSEEN',
    },
    data: {
      status: 'SEEN',
    },
  }); */

  const messages = currentConversation.messages || [];

  return (
    <section className="min-h-[95%] w-full flex items-start justify-start bg-fuchsia-300/40">
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
      <section className="flex flex-col items-start justify-between px-2 pb-20 w-full h-[95%]">
        {/* message page */}
        {/* conversation header */}
        <div className="flex justify-between gap-2 w-full px-2 pt-3 border-b ">
          <h2 className="mb-0">
            {currentConversation.title?.toLocaleUpperCase()}
            {' - '}
            <span className="font-extralight text-sm">
              Created At: {currentConversation.createdAt?.toLocaleString()}
            </span>
          </h2>
          <form action={handleDeleteConversation}>
            <input
              type="hidden"
              name="conversationId"
              value={currentConversation.id}
            />
            <button>
              {currentConversation.role === 'CREATOR' ? (
                <IconWrapper
                  type="delete"
                  strokeWidth={2}
                  className="hover:text-red-600 dark:hover:text-dark-greenLight hover:scale-110"
                />
              ) : (
                <IconWrapper
                  type="logOut"
                  strokeWidth={2}
                  className="hover:text-red-600 dark:hover:text-dark-greenLight hover:scale-110"
                />
              )}
            </button>
          </form>
        </div>
        {/* messages window */}
        <DashboardMessagesWindow messages={messages} session={session} />

        {/* form to send messages to the current conversation */}
        <form action={handleMessageSendSubmit} className="w-full ">
          <input
            type="hidden"
            name="conversationId"
            value={currentConversation?.id}
          />
          <SendMessageInput />
        </form>
      </section>
    </section>
  );
}
