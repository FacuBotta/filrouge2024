'use client';

import { sendMessageInConversation } from '@/actions/messagesServerActions/sendMessageInConversation';
import { Icon } from 'facu-ui';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ChatInputProps {
  currentConversationId: string;
}

const ChatInput = ({ currentConversationId }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const handleMessageSend = async () => {
    if (!message.trim()) return;

    const response = await sendMessageInConversation({
      conversationId: currentConversationId,
      message,
      invitationId: null,
    });
    if (response?.ok) {
      setMessage('');
      router.refresh();
    } else {
      console.error(response);
      // TODO: mostrar mensaje de error
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMessageSend();
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full mt-2 sm:mb-2 items-center justify-center">
        <textarea
          aria-label="message input"
          className="w-full min-h-14 p-2 rounded-xl border border-dark-bg shadow-lg"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-light-yellow dark:bg-dark-greenLight p-2 m-2 rounded-md size-fit"
          type="button"
          aria-label="send message button"
          onClick={handleMessageSend}
        >
          <Icon type="send" color="black" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
