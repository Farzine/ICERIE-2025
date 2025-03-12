/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'customPurple': '#4B47FF',
        'customGray': '#E9E4E4',
      },
      animation: {
        'scroll': 'scroll 40s linear infinite',
        'scroll-reverse': 'scroll-reverse 40s linear infinite',
        'scroll-slower': 'scroll 50s linear infinite',
        'scroll-faster': 'scroll 20s linear infinite',
        'pause-on-hover': 'pause-on-hover 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 1rem))' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(calc(-100% - 1rem))' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.pause-scroll': {
          'animation-play-state': 'paused',
        },
        '.smooth-scroll': {
          'scroll-behavior': 'smooth',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

