import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   white: "#ffffff",
    //   purple: "#3f3cbb",
    //   midnight: "#121063",
    //   metal: "#565584",
    //   tahiti: "#3ab7bf",
    //   silver: "#ecebff",
    //   "bubble-gum": "#ff77e9",
    //   bermuda: "#78dcca",
    // },
  },
  darkMode: "class",
  plugins: [nextui()],
};
