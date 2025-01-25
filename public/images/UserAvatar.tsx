'use client';

import Image from 'next/image';

export const UserAvatar = ({
  className,
  src,
}: {
  className?: string;
  src?: string | null | undefined;
}) => {
  return (
    <div className={className || 'size-12'}>
      <Image
        width={350}
        height={350}
        src={src || '/images/DefaultUserAvatar1.png'}
        className="size-full rounded-full border"
        alt="user avatar"
      />
    </div>
  );
};
