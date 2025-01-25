'use client';

import { handleDeleteConversation } from '@/actions/messagesServerActions/handleDeleteConversation';
import { handleMessageSendSubmit } from '@/actions/messagesServerActions/handleMessageSendSubmit';
import { SendMessageInput } from '@/components/forms/SendMessageInput';
import { ConversationsList } from '@/components/ui/dashboard/conversationsList';
import DashboardMessagesWindow from '@/components/ui/dashboard/DashboardMessagesWindow';
import IconWrapper from '@/components/ui/IconWrapper';
import MessageDefaultPageImage from '@/public/images/MessageDefaultPageImage';
import { Conversation } from '@/types/types';
import { Icon } from 'facu-ui';
import { Link } from 'next-view-transitions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
export default function MessagePage({
  session,
  conversations,
}: {
  session: any;
  conversations: Conversation[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentConversationId = searchParams.get('id');
  const currentConversation = conversations.find(
    (conversation) => conversation.id === currentConversationId
  ) as Conversation;

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;
    if (!message) {
      return;
    }
    const response = await handleMessageSendSubmit(formData);
    if (response?.ok) {
      console.log('message sent');
    } else {
      // TODO: mostrar un mensaje de error o algo asi
      console.error(response);
    }
  };

  return (
    <section className="main-container-messages max-w-max mx-auto min-h-full mb-5 mt-5 w-full flex items-start justify-start">
      {/* conversations section */}
      <div
        className={`${currentConversation ? 'hidden' : 'flex'} mx-auto max-w-[500px] lg:flex flex-col gap-2 w-screen lg:w-[40%] p-3 lg:border-r`}
      >
        <div className="flex w-full items-center justify-between px-5 pb-2 border-b">
          <h2 className="text-2xl">Chats</h2>
          <Link aria-label="Créer un nouveau chat" href={'/messages/new'}>
            <IconWrapper
              type="add"
              strokeWidth={2}
              width={50}
              className="hover:scale-110 transition-all ease-in-out "
            />
          </Link>
        </div>
        <ConversationsList session={session} conversations={conversations} />
      </div>
      {/* default content when no conversation is selected */}

      {!currentConversation ? (
        <div className="hidden lg:flex items-center justify-center w-full my-auto  ">
          <div className="flex flex-wrap w-full max-w-[900px] justify-center">
            <div className="flex flex-col items-center mb-5 ">
              <h1 className="text-center text-3xl lg:text-4xl font-semibold mb-4">
                👋 Bienvenue sur votre système de messagerie !
              </h1>
              <h2 className="text-center mb-2 lg:text-2xl lg:mb-5">
                Sélectionnez ou créez une conversation pour commencer 🚀
              </h2>
              <p className="text-center text-lg lg:text-2xl font-extralight">
                🌟 Ici, vous pouvez gérer toutes vos conversations en un seul
                endroit. Communiquez, partagez vos idées et résolvez des
                problèmes rapidement. La communication n'a jamais été aussi
                simple !
              </p>
            </div>
            <div className="flex w-[400px] h-full">
              <MessageDefaultPageImage />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`messages-container ${currentConversation ? 'flex' : 'hidden'} lg:flex flex-col items-start justify-between px-2  pb-5 sm:pb-0 w-full `}
        >
          {/* conversation header */}
          <div className="flex items-start justify-between gap-2 w-full px-2 pt-3 ">
            {/* button to go back to the conversations list */}
            <div className="flex gap-5 items-end">
              <div className="border rounded-full size-8 flex justify-center items-center mb-2 peer hover:dark:text-dark-greenLight hover:dark:border-dark-greenLight hover:scale-110 transition-all ease-in-out">
                <Icon
                  type="goBack"
                  // className="lg:hidden"
                  onClick={() => router.push('/messages')}
                />
              </div>
              <h2 className="mb-0 text-center">
                {currentConversation?.title?.toLocaleUpperCase()}
                <span className="font-extralight text-sm block sm:inline-block">
                  <span className="hidden sm:inline-block mr-2">{' - '}</span>
                  Created At: {currentConversation?.createdAt?.toLocaleString()}
                </span>
              </h2>
            </div>
            <form action={handleDeleteConversation}>
              <input
                type="hidden"
                name="conversationId"
                value={currentConversation?.id}
              />
              <button
                aria-label={`${currentConversation?.role === 'CREATOR' ? 'Supprimer' : 'Fermer'} la conversation`}
              >
                {currentConversation?.role === 'CREATOR' ? (
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
          <DashboardMessagesWindow
            messages={currentConversation?.messages || []}
            session={session}
          />

          {/* form to send messages to the current conversation */}
          <form onSubmit={(e) => handleMessageSend(e)} className="w-full ">
            <input
              type="hidden"
              name="conversationId"
              value={currentConversation?.id}
            />
            <SendMessageInput />
          </form>
        </div>
      )}
    </section>
  );
}
