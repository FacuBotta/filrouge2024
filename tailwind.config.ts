import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: {
          ciel: "#90CCF4",
          blue: "#5DA2D5",
          grey: "#ECECEC",
          yellow: "#F3D250",
          red: "#F78888"
        },
        dark: {
          grey: "#EDEAE5",
          yellow: "#FCE181",
          yellowLight: "#FEF9C7",
          greenLight: "#9FEDD7",
          green: "#026670",
          bg: "#232323"
        },
      },
    },
  plugins: [],
},
};
export default config;
