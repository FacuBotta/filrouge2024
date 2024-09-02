'use client';

import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { Conversation, Participant } from '@/types/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const ConversationsList = ({
  conversations,
}: {
  conversations: Conversation[];
}) => {
  console.log('conversations from conversationsList', conversations);

  // teke id of the conversation that is selected from url
  const ulVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const liVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <div>
      <motion.ul
        variants={ulVariants}
        initial="hidden"
        animate="show"
        className="no-scrollbar flex flex-col gap-2 overflow-y-scroll h-[80vh] w-full "
      >
        {conversations.map((conversation: any) => (
          <motion.li
            variants={liVariants}
            key={conversation.id}
            className="hover:scale-x-[1.01] transition-transform ease-in-out border p-2 mx-2 bg-slate-600/50 rounded-lg "
          >
            <Link
              className={`flex justify-between`}
              href={`/dashboard/messages/${conversation.id}`}
            >
              <p>{conversation.title}</p>
              <span className="font-extralight text-sm">
                {conversation.updatedAt.toLocaleDateString()}
              </span>
              <div className="flex justify-start max-h-12">
                {conversation?.participants.map((participant: Participant) =>
                  participant.image ? (
                    <img
                      key={participant.id}
                      alt="user avatar"
                      src={participant.image}
                      className="h-full aspect-square rounded-full border"
                    />
                  ) : (
                    <DefaultUserAvatar
                      key={participant.id}
                      className="h-full opacity-50"
                    />
                  )
                )}
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
