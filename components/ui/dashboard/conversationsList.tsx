'use client';

import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { UserAvatar } from '@/public/images/UserAvatar';
import { Conversation, Participant } from '@/types/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NotificationSpan } from '../NotificationSpan';
import { useState } from 'react';

export const ConversationsList = ({
  conversations,
}: {
  conversations: Conversation[];
}) => {
  const [conversationsOpen, setConversationsOpen] = useState<string[]>([]);

  const pathName = usePathname();
  const currentConversationId = pathName.split('/')[3];

  const handleConversationClick = (conversationId: string) => {
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
            <Link
              onClick={() => handleConversationClick(conversation.id)}
              className={`flex justify-between`}
              href={`/dashboard/messages/${conversation.id}`}
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
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
