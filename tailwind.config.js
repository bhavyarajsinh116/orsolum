/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#03331b',
          primary: '#095835',
          forest: '#0c6b41',
          medium: '#138150',
          light: '#23a268',
          accent: '#e6a117',
          gold: '#f5b027',
          cream: '#f9f8f3',
          paper: '#f3efe6',
          sand: '#ece5d8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

