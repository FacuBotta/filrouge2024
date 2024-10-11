'use client';

import { useTheme } from 'next-themes';
import { Icon } from 'facu-ui';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 mt-2 w-[29px] h-[29px] cursor-pointer rounded-full bg-white/50"></div>
    );
  }

  return (
    <div
      className="p-1 mt-1 h-fit cursor-pointer rounded-full hover:bg-white/50 hover:animate-swing"
      onClick={() =>
        currentTheme === 'dark' ? setTheme('light') : setTheme('dark')
      }
    >
      <Icon
        className="active:scale-95"
        strokeWidth={2}
        type={currentTheme === 'dark' ? 'sun' : 'moon'}
        width={25}
      />
    </div>
  );
}
