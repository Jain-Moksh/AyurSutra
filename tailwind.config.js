/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ayur-green': '#2D5A27',
        'ayur-light-green': '#4A7C59',
        'ayur-beige': '#F5F5DC',
        'ayur-cream': '#FFF8DC',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}