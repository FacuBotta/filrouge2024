import React from 'react';
import IconWrapper from '../ui/IconWrapper';

export const SendMessageInput: React.FC = () => {
  return (
    <div className=" flex w-full max-w-[900px] mt-2 items-center justify-center">
      <textarea
        aria-label="message input"
        cols={3}
        className="w-full min-h-14 p-2 rounded-xl border border-dark-bg shadow-lg"
        name="message"
        placeholder="message"
      />
      <button
        className="bg-light-yellow dark:bg-dark-greenLight p-2 m-2 rounded-md size-fit"
        type="submit"
        aria-label="send message button"
      >
        <IconWrapper type="send" color="black" strokeWidth={2} />
      </button>
    </div>
  );
};
