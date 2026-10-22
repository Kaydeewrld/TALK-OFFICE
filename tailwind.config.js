/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Acorn', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        teal: {
          DEFAULT: '#0C7C7B',
          hover: '#08605F',
          dark: '#064E4D',
          light: '#EAF6F6',
        },
        gold: {
          DEFAULT: '#D99B26',
          hover: '#BF8317',
          light: '#FDF7EC',
        }
      }
    },
  },
  plugins: [],
}
