import React from 'react';
import { getUserMessages } from '@/actions/messagesServerActions/getUserMessages';
import Link from 'next/link';

const MessagePage: React.FC = async () => {
  const messages = (await getUserMessages()) || [];
  // console.log('messages from message page', messages);

  return (
    <div className="flex flex-col gap-2 min-h-full p-3 ">
      <div className="">
        <h2>Messages</h2>
      </div>
      <div className="flex flex-col gap-2  h-[80vh] w-full">
        {messages.map((message) => (
          <div key={message.id}>
            <Link
              // TODO: mover el scroll to el mensaje
              href={`/dashboard/messages/${message.conversationId}/#${message.id}`}
            >
              <span className="text-green-600 font-extralight">
                At : {message.createdAt.toLocaleTimeString()}
                updatedAt : {message.updatedAt.toLocaleTimeString()}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagePage;
