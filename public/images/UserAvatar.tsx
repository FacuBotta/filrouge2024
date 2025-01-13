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
    <div className={className ? className : 'size-12'}>
      <Image
        width={250}
        height={250}
        src={src ? src : '/images/DefaultUserAvatar1.png'}
        className="size-full rounded-full border"
        alt="user avatar"
      />
    </div>
  );
};
