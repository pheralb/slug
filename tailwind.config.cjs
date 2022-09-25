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
        midnight: "#1E1E2E",
        midnightLight: "#28283E",
      },
    },
  },
  plugins: [],
};
