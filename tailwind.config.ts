import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      fredoka: ['var(--font-fredoka)'],
    },
    extend: {
      screens: {
        '4xl': '2000px',
      },
      maxWidth: {
        max: '1600px',
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
        scaleHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        swing: 'swing 0.5s ease-in-out 2',
        scaleHover: 'scaleHover 0.3s ease-in-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        light: {
          cards: '#90CCF4',
          borderCards: '#232323',
          ciel: '#acd6f2',
          blue: '#5DA2D5',
          grey: '#ECECEC',
          yellow: '#F3D250',
          red: '#F78888',
        },
        dark: {
          cards: '#5C5C5C',
          borderCards: '#ECECEC',
          grey: '#EDEAE5',
          yellow: '#FCE181',
          yellowLight: '#FEF9C7',
          greenLight: '#9FEDD7',
          green: '#026670',
          bg: '#232323',
        },
      },
    },
    plugins: [],
  },
};
export default config;
