/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'my-cream': '#F9EA85', // Light mode cream
        'my-cream-dark': '#16A085', // Dark mode cream (dark color)

        'my-gold': '#FFB30B', // Light mode gold
        'my-gold-dark': '#16A085', // Dark mode gold (dark color)

        'my-green': '#09D9B7', // Light mode green
        'my-green-dark': '#3DBD99', // Dark mode green (dark color)

        'words': '#111111', // Light mode text color
        'words-dark': '#FFFFFF', // Dark mode text color

        'background': '#FFFFFF', // Light mode background
        'background-dark': '#222831', // Dark mode background
      }
    },
  },
  plugins: [],
}

