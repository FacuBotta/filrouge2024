'use client';

import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { UserAvatar } from '@/public/images/UserAvatar';
import { Conversation } from '@/types/types';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { NotificationSpan } from '../NotificationSpan';
import { useCallback, useState } from 'react';
import { updateMessagesStatus } from '@/actions/messagesServerActions/updateMessagesStatus';

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
      '/dashboard/messages/?' +
        pushConversationIdToSearchParams('id', conversationId)
    );
    // update the messages status to SEEN for the conversation opened
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
        className="no-scrollbar flex flex-col gap-2 overflow-y-scroll h-[75vh] w-full"
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
            } p-2 mx-2 max-h-16 bg-slate-600/50 rounded-lg shadow-xl`}
          >
            <div
              onClick={() => handleClick(conversation.id)}
              className={`flex justify-between cursor-pointer`}
            >
              <div>
                <p className="text-xl">
                  {conversation.title}
                  {!conversationsOpen.includes(conversation.id) &&
                    (conversation.unreadMessages as number) > 0 && (
                      <NotificationSpan
                        notifications={conversation.unreadMessages}
                      />
                    )}
                </p>
                <span className="font-extralight text-sm">
                  {new Date(conversation.updatedAt).toLocaleDateString()}
                  {' - '}
                  {conversation?.participants?.length} participants
                </span>
              </div>
              <div className="flex justify-end items-center w-[40%] overflow-hidden max-h-12">
                {conversation?.participants?.map(
                  (participant, key) =>
                    key < 3 &&
                    (participant.image ? (
                      <UserAvatar
                        key={participant.id}
                        src={participant.image}
                        className="h-full"
                      />
                    ) : (
                      <DefaultUserAvatar
                        key={participant.id}
                        className="h-full opacity-50"
                      />
                    ))
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
