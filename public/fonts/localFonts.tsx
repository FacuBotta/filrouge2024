import localFont from 'next/font/local';

export const Fredoka = localFont({
  src: [
    {
      path: './fredoka/Fredoka-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fredoka/Fredoka-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fredoka/Fredoka-SemiBold.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fredoka/Fredoka-Light.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-fredoka',
  display: 'swap',
});
