/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'none',
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')]
}