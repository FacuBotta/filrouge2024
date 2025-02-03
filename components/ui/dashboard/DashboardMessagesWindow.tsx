'use client';

import { UserAvatar } from '@/public/images/UserAvatar';
import { Message } from '@/types/types';
import React, { useEffect, useRef } from 'react';

interface messagesWindowsProps {
  messages: Message[];
  userId: string;
}

export default function DashboardMessagesWindow({
  messages,
  userId,
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
      className="no-scrollbar flex flex-col gap-2 w-full h-full mx-auto  px-2 pb-10 border border-light-borderCards dark:border-dark-borderCards pt-5 rounded-xl my-3 overflow-y-scroll scroll-smooth bg-dark-grey/10"
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
                  {prevMessage.createdAt.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <hr className="border-gray-500" />
              </div>
            );
          }
        }
        acc.push(
          <div
            key={message.id}
            className={`flex flex-col-reverse sm:flex-row-reverse w-[80%] items-end relative ${
              userId === message?.sender?.id ? 'ml-5' : 'm-auto'
            }`}
          >
            {/* message box */}
            <div
              className={`border border-gray-800 p-2 sm:p-5 flex flex-col w-full shadow-xl rounded-t-lg ${
                userId === message?.sender?.id
                  ? 'bg-dark-yellowLight/50 dark:bg-dark-greenLight/20 rounded-br-lg ml-16'
                  : 'bg-slate-600/50 rounded-bl-lg mr-16'
              }`}
            >
              <p>{message.content} </p>
              <div className="flex justify-between items-start text-sm pt-1 font-extralight border-t border-gray-900">
                <span>{message.sender.username || 'Aucun nom'}</span>
                <span>{message.createdAt.toLocaleTimeString('fr-FR')}</span>
              </div>
            </div>
            {
              <UserAvatar
                className={`size-12 mx-2 hidden sm:block absolute ${userId === message?.sender?.id ? 'left-0 -bottom-7' : 'right-0 -bottom-7'}`}
                src={message.sender.image}
              />
            }
          </div>
        );
        return acc;
      }, [] as React.JSX.Element[])}
    </div>
  );
}
