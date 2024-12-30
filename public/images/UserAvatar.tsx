'use client';

import Image from 'next/image';
import { useMemo } from 'react';

// Importa todas las imágenes por adelantado
const defaultAvatars = [
  require('@/public/images/DefaultUserAvatar1.png'),
  require('@/public/images/DefaultUserAvatar2.png'),
  require('@/public/images/DefaultUserAvatar3.png'),
  require('@/public/images/DefaultUserAvatar4.png'),
  require('@/public/images/DefaultUserAvatar5.png'),
  require('@/public/images/DefaultUserAvatar6.png'),
  require('@/public/images/DefaultUserAvatar7.png'),
  require('@/public/images/DefaultUserAvatar8.png'),
];

export const UserAvatar = ({
  className,
  src,
}: {
  className?: string;
  src?: string | null | undefined;
}) => {
  // Selecciona una imagen aleatoria solo si `src` no está definido
  const imageSrc = useMemo(() => {
    if (!src) {
      const randomNumber = Math.floor(Math.random() * defaultAvatars.length);
      return defaultAvatars[randomNumber];
    }
    return src;
  }, [src]);

  return (
    <div className={className}>
      <Image
        width={40}
        height={40}
        src={imageSrc}
        className="size-12 rounded-full border"
        alt="user avatar"
      />
    </div>
  );
};
