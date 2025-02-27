'use client';

import Image from 'next/image';

interface UserAvatarProps {
  className?: string;
  src?: string | null | undefined;
  onClick?: () => void;
}

export const UserAvatar = ({ className, src, onClick }: UserAvatarProps) => {
  const defaultSrc = '/images/DefaultUserAvatar1.png';
  const imageSrc = src && src.trim() ? src : defaultSrc;

  return (
    <div
      className={`${className || 'size-12'} ${onClick ? 'cursor-pointer' : ''} relative overflow-hidden rounded-full`}
      onClick={onClick}
      aria-label="User avatar"
    >
      <Image
        width={350}
        height={350}
        src={imageSrc}
        className="rounded-full border border-card object-cover overflow-hidden"
        alt="user avatar"
      />
    </div>
  );
};
