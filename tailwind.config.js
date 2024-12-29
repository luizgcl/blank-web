/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'none',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')]
}