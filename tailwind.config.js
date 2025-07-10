/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      orange: {
        100: '#FFF7ED',
        500: '#F97316',
        600: '#EA580C',
      },
      gray: {
        300: '#D1D5DB',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
    backgroundImage: {
      'custom-image': "url('/src/assets/img/bg-curvy-desktop.svg')",
      'mobile-bg-curvy': "url('/src/assets/img/bg-curvy-mobile.svg')",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}