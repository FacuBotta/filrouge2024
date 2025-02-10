'use client';

import { UserAvatar } from '@/public/images/UserAvatar';
import { Invitation, Message } from '@/types/types';
import { Link } from 'next-view-transitions';
import React, { useEffect, useRef } from 'react';
import AcceptInvitationButton from './AcceptInvitationButton';

interface messagesWindowsProps {
  messages: Message[];
  userId: string;
}

export default function MessagesWindow({
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

  const renderInvitationButton = (invitation: Invitation) => {
    if (
      invitation.status === 'WAITING_PARTICIPANT_RESPONSE' &&
      userId === invitation.participantId
    ) {
      return (
        <Link href={`/events/event/${invitation.eventId}`}>
          <button className="primary-btn my-2">Voir l&apos;événement</button>
        </Link>
      );
    }
    if (
      invitation.status === 'WAITING_CREATOR_RESPONSE' &&
      userId === invitation.creatorId
    ) {
      return (
        <AcceptInvitationButton userInvitation={invitation} className="my-2" />
      );
    }
    if (invitation.status === 'JOINED') {
      return (
        <div className="font-extralight text-lg opacity-50">
          Invitation acceptée
        </div>
      );
    }
    if (
      invitation.status === 'DECLINED_BY_CREATOR' ||
      invitation.status === 'DECLINED_BY_PARTICIPANT'
    ) {
      return (
        <div className="font-extralight text-lg opacity-50">
          Invitation déclinée
        </div>
      );
    }
    if (
      invitation.status === 'WAITING_CREATOR_RESPONSE' ||
      invitation.status === 'WAITING_PARTICIPANT_RESPONSE'
    ) {
      return (
        <div className="font-extralight text-lg opacity-50">
          Invitation en attente de réponse
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={messagesWindowRef}
      className="no-scrollbar flex flex-col items-center gap-10 w-full h-full mx-auto  px-2 pb-10 border border-light-borderCards dark:border-dark-borderCards pt-5 rounded-xl my-3 overflow-y-scroll scroll-smooth bg-dark-grey/10"
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
              userId === message?.sender?.id ? 'ml-5' : 'mx-auto'
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
              {message.invitation && renderInvitationButton(message.invitation)}
              <div className="flex justify-between items-start text-sm pt-1 font-extralight border-t border-gray-900">
                <span>
                  {message.sender.id === userId
                    ? 'Moi'
                    : message.sender.username || message.sender.email}
                </span>
                <span>
                  {new Date(message.createdAt).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
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
