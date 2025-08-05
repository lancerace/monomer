/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        confluency: {
          'very-low': '#dcfce7', // light green
          'growing': '#16a34a', // green
          'optimal': '#facc15', // yellow
          'over': '#dc2626', // red
          'no-data': '#f3f4f6', // light grey
        }
      }
    },
  },
  plugins: [],
}