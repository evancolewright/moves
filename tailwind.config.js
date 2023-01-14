/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './screens/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9933FF',
        secondary: '#363636',
        lightGray: '#F0F0F0',
      },
    },
  },
  plugins: [],
};
