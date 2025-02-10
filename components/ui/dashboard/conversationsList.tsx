'use client';

import { updateMessagesStatus } from '@/actions/messagesServerActions/updateMessagesStatus';
import { UserAvatar } from '@/public/images/UserAvatar';
import { Conversation, Participant } from '@/types/types';
import { Icon } from 'facu-ui';
import { motion } from 'framer-motion';
import { Link } from 'next-view-transitions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { NotificationSpan } from '../NotificationSpan';

export const ConversationsList = ({
  userId,
  conversations,
}: {
  userId: string;
  conversations: Conversation[];
}) => {
  const [conversationsOpen, setConversationsOpen] = useState<string[]>([]);
  const [filteredConversations, setFilteredConversations] =
    useState<Conversation[]>(conversations);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentConversationId = searchParams.get('id');

  const pushConversationIdToSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSelectConversation = async (conversationId: string) => {
    router.push(
      '/messages/?' + pushConversationIdToSearchParams('id', conversationId)
    );
    await updateMessagesStatus({
      userId,
      conversationId,
    });
    // update the conversations opened to update the notifications in client side
    setConversationsOpen((prev) => [...prev, conversationId]);
  };
  const handleSearchConversation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (searchValue) {
      const filteredConversations = conversations.filter((conversation) => {
        return (
          conversation.title
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          conversation.participants?.some((participant) => {
            return (
              participant.email
                ?.toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              participant.username
                ?.toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })
        );
      });
      setFilteredConversations(filteredConversations);
    } else {
      setFilteredConversations(conversations);
    }
  };

  return (
    <aside className="flex flex-col gap-2 w-full">
      <header className="flex w-full items-center justify-between pl-2 pb-2 border-b gap-2">
        {/* <h2 className="text-2xl">Chats</h2> */}
        <input
          type="search"
          className="newEventInput !mt-0"
          placeholder="Chercher une conversation..."
          onChange={(e) => handleSearchConversation(e)}
        ></input>
        <Link aria-label="Créer un nouveau chat" href={'/messages/new'}>
          <Icon
            type="add"
            strokeWidth={2}
            width={50}
            className="hover:scale-110 transition-all ease-in-out "
          />
        </Link>
      </header>
      <motion.ul
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        initial="hidden"
        animate="show"
        className="no-scrollbar h-[80vh] flex flex-col gap-2 overflow-y-scroll  w-full pb-16 sm:pb-5 sm:mt-3"
      >
        {filteredConversations.map((conversation) => (
          <motion.li
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            key={conversation.id}
            className={`hover:scale-x-[1.01] transition-transform ease-in-out border ${
              currentConversationId === conversation.id
                ? 'border-light-yellow'
                : 'border-dark-bg/50'
            } p-2 mx-2 h-fit bg-card rounded-lg shadow-xl`}
          >
            <div
              onClick={() => handleSelectConversation(conversation.id)}
              className={`flex gap-2 cursor-pointer`}
            >
              {/* User avatar */}
              <div className="flex shrink-0">
                {conversation?.participants?.map(
                  (participant: Participant) =>
                    participant.id === userId && (
                      <UserAvatar
                        key={participant.id}
                        src={participant.image}
                        className="size-10"
                      />
                    )
                )}
              </div>
              {/* conversation info */}
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xl">
                  {conversation.title ? conversation.title : 'no title'}
                  {!conversationsOpen.includes(conversation.id) &&
                    (conversation.unreadMessages as number) > 0 && (
                      <NotificationSpan
                        notifications={conversation.unreadMessages}
                      />
                    )}
                </p>
                <div className="flex gap-5 justify-between w-full items-start ">
                  <div className="flex gap-1">
                    <Icon type="user" width={20} />
                    <p className="font-extralight text-sm">
                      {conversation?.participants?.length} participants
                    </p>
                  </div>
                  <span className="font-extralight text-sm">
                    {new Date(conversation.updatedAt).toLocaleDateString(
                      'fr-FR',
                      {
                        weekday: 'long',
                      }
                    )}{' '}
                    à{' '}
                    {new Date(conversation.updatedAt).toLocaleTimeString(
                      'fr-FR',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </aside>
  );
};
