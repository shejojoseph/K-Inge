/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",      // if you have a /pages folder
    "./src/components/**/*.{js,ts,jsx,tsx}",  // if you have a /components folder
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', "cursive"],
      },
    },
  },
  plugins: [],
};