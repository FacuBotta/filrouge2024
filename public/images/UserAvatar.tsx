'use client';

import Image from 'next/image';

export const UserAvatar = ({
  className,
  src,
}: {
  className?: string;
  src?: string | null;
}) => {
  return (
    <div className={className}>
      <Image
        width={40}
        height={40}
        src={src || ''}
        className="size-12 rounded-full border"
        alt="user avatar"
      />
    </div>
  );
};
