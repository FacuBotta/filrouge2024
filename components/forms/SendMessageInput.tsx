import React from 'react';
import IconWrapper from '../ui/IconWrapper';

export const SendMessageInput: React.FC = async () => {
  return (
    <div className=" flex w-full mt-2 items-center justify-center">
      <textarea
        cols={3}
        className="w-full min-h-14 p-2 rounded-xl border border-dark-bg shadow-lg"
        name="message"
        placeholder="message"
      />
      <button
        className="bg-light-yellow dark:bg-dark-greenLight p-2 m-2 rounded-md size-fit"
        type="submit"
      >
        <IconWrapper type="send" color="black" strokeWidth={2} />
      </button>
    </div>
  );
};
