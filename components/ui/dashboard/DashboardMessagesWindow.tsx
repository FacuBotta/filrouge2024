'use client';

import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { Message } from '@/types/types';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface messagesWindowsProps {
  messages: Message[];
  session: any;
}

export default function DashboardMessagesWindow({
  messages,
  session,
}: messagesWindowsProps) {
  const messagesWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesWindowRef.current) {
      messagesWindowRef.current.scrollTop =
        messagesWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const isDifferentDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() !== date2.getFullYear() ||
      date1.getMonth() !== date2.getMonth() ||
      date1.getDate() !== date2.getDate()
    );
  };

  return (
    <div
      ref={messagesWindowRef}
      className="no-scrollbar flex flex-col gap-2 w-full h-full mx-auto  px-2 pb-10 pt-5 rounded-b-xl overflow-y-scroll scroll-smooth"
    >
      {messages?.reduce((acc, message, index, arr) => {
        if (index > 0) {
          const prevMessage = arr[index - 1];
          // if the message is from a different day, add a separator
          if (isDifferentDay(message.createdAt, prevMessage.createdAt)) {
            acc.push(
              <div
                key={`separator-${index}`}
                className="w-full text-center my-2 text-gray-500"
              >
                <span className="px-2 ">
                  {prevMessage.createdAt.toDateString()}
                </span>
                <hr className="border-gray-500" />
              </div>
            );
          }
        }
        acc.push(
          <div
            key={message.id}
            className={`flex flex-row-reverse w-[80%] items-center ${
              session?.user?.id === message?.sender?.id ? 'ml-5' : 'm-auto'
            }`}
          >
            {/* message box */}
            <div
              className={`border border-gray-800 px-2 pt-2 flex flex-col w-full shadow-xl ${
                session?.user?.id === message?.sender?.id
                  ? 'bg-dark-yellowLight/50 dark:bg-dark-greenLight/20'
                  : 'bg-slate-600/50'
              }`}
            >
              <p>{message.content} </p>
              <div className="flex justify-between items-start text-sm pt-1 font-extralight border-t border-gray-900">
                <span>{message.sender.email}</span>
                <span>{message.createdAt.toLocaleTimeString('fr-FR')}</span>
              </div>
            </div>
            {message.sender.image ? (
              <Image
                width={40}
                height={40}
                className="size-12 aspect-square rounded-full border mx-2 hidden sm:block"
                src={message.sender.image}
                alt="user avatar"
              />
            ) : (
              <DefaultUserAvatar
                key={message.sender.id}
                className="size-12 mx-2 opacity-40 hidden sm:block"
              />
            )}
          </div>
        );
        return acc;
      }, [] as JSX.Element[])}
    </div>
  );
}
