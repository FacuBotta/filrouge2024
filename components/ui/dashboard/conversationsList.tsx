'use client';

import { Conversation } from '@prisma/client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const ConversationsList = ({
  conversations,
}: {
  conversations: any;
}) => {
  console.log('conversations from conversationsList', conversations);
  return (
    <motion.ul
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="flex flex-col gap-2 overflow-y-scroll h-[80vh] w-full"
    >
      {conversations.map((conversation: any) => (
        <li key={conversation.id}>
          <Link
            className="border m-2 p-2 bg-gray-400/50 rounded-lg flex justify-between"
            href={`/dashboard/messages/${conversation.id}`}
          >
            <p>{conversation.title}</p>
            <span className="font-extralight text-sm">
              {conversation.updatedAt.toLocaleDateString()}
            </span>
            <div className="flex gap-2">
              {conversation?.participants?.map((participant: any) => (
                <img
                  key={participant.id}
                  alt="user avatar mx-[-17px]"
                  src={participant?.user?.image || ''}
                  className="size-14 rounded-full border "
                />
              ))}
            </div>
          </Link>
        </li>
      ))}
    </motion.ul>
  );
};
