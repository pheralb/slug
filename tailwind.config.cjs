/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        custom: "15px",
      },
      colors: {
        midnight: "#121212",
        midnightLight: "#292828",
      },
    },
  },
  plugins: [],
};
