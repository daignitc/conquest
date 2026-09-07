/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0A10',
        'obsidian-raised': '#15131C',
        ember: '#FF6A3D',
        'ion-blue': '#5EE0FF',
        parchment: '#F3EFE6',
        iron: '#6B6875',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
