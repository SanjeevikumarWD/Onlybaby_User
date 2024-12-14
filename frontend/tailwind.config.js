/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sour: ["Sour Gummy", 'sans-serif'],
        happy: ["Happy Monkey", 'cursive'],
      },
    },
  },
  plugins: [],
};
