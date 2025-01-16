'use client';

import { updateMessagesStatus } from '@/actions/messagesServerActions/updateMessagesStatus';
import { UserAvatar } from '@/public/images/UserAvatar';
import { Conversation } from '@/types/types';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { NotificationSpan } from '../NotificationSpan';

export const ConversationsList = ({
  session,
  conversations,
}: {
  session: any;
  conversations: Conversation[];
}) => {
  const [conversationsOpen, setConversationsOpen] = useState<string[]>([]);
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

  const handleClick = async (conversationId: string) => {
    router.push(
      '/messages/?' + pushConversationIdToSearchParams('id', conversationId)
    );
    await updateMessagesStatus({
      user_id: session?.user?.id,
      conversation_id: conversationId,
    });
    // update the conversations opened to update the notifications in client side
    setConversationsOpen((prev) => [...prev, conversationId]);
  };

  return (
    <div>
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
        className="no-scrollbar conversation-list-container flex flex-col gap-2 overflow-y-scroll  w-full pb-16 sm:pb-5"
      >
        {conversations.map((conversation) => (
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
            } p-2 mx-2 h-fit bg-slate-600/50 rounded-lg shadow-xl`}
          >
            <div
              onClick={() => handleClick(conversation.id)}
              className={`flex justify-between cursor-pointer`}
            >
              <div>
                <p className="text-xl">
                  {conversation.title ? conversation.title : 'no title'}
                  {!conversationsOpen.includes(conversation.id) &&
                    (conversation.unreadMessages as number) > 0 && (
                      <NotificationSpan
                        notifications={conversation.unreadMessages}
                      />
                    )}
                </p>
                <span className="font-extralight text-sm">
                  {new Date(conversation.updatedAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="flex flex-col gap-1 justify-end items-start w-[40%] overflow-hidden">
                <div className="flex gap-1">
                  {conversation?.participants?.map(
                    (participant, key) =>
                      key < 5 && (
                        <UserAvatar
                          key={participant.id}
                          src={participant.image}
                          className="size-10"
                        />
                      )
                  )}
                </div>
                <p className="font-extralight text-sm">
                  {conversation?.participants?.length} participants
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
