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
          ciel: '#90CCF4',
          blue: '#5DA2D5',
          grey: '#ECECEC',
          yellow: '#F3D250',
          red: '#F78888',
        },
        dark: {
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
