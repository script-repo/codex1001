/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f1115',
        surface: '#141820',
        surfaceMuted: '#1b1f2a',
        primary: '#7367f0',
        accent: '#4ade80',
        warning: '#f97316',
        danger: '#ef4444'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
