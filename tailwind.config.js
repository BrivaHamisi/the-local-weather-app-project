/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#00668a',
        'weather-secondary': '#004e71',
      },
    },
    fontFamily: {
      'Roboto': [ 'Roboto', 'sans-serif'],
    },
    container:{
      center: true,
      padding: '2rem',
    },
    screens: {
      'xs': '576px',
      'sm': '768px',
      'md': '992px',
      'lg': '1200px',
     }
  },
  plugins: [],
}

