'use client';

import { sendMessageInConversation } from '@/actions/messagesServerActions/sendMessageInConversation';
import { Icon } from 'facu-ui';
import React, { useState } from 'react';

interface ChatInputProps {
  currentConversationId: string;
}

const ChatInput = ({ currentConversationId }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleMessageSend = async () => {
    if (!message.trim()) return;

    const formData = new FormData();
    formData.append('conversationId', currentConversationId);
    formData.append('message', message);

    const response = await sendMessageInConversation(formData);
    if (response?.ok) {
      console.log('message sent');
      setMessage(''); // 🔹 Resetea el textarea correctamente
    } else {
      console.error(response);
      // TODO: mostrar mensaje de error
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 🔹 Evita el salto de línea normal
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
          value={message} // 🔹 Controlado con estado
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // 🔹 Detecta Enter para enviar
        />
        <button
          className="bg-light-yellow dark:bg-dark-greenLight p-2 m-2 rounded-md size-fit"
          type="button"
          aria-label="send message button"
          onClick={handleMessageSend} // 🔹 Envía con el botón también
        >
          <Icon type="send" color="black" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
