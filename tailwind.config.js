/** @type {import('tailwindcss').Config} */
import { createThemes } from "tw-colors";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        white: "#ffffff",
        black: "#242424",
      },
      dark: {
        white: "#242424",
        black: "#f3f3f3",
      },
    }),
  ],
};
