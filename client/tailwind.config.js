/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00826a",
      },
      fontFamily: {
        custom: ["Lucida Grande", "helvatica", "Verdana", "sans-serif"],
      },
    },
  },
  plugins: [],
};
