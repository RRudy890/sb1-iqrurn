/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1E1E1E',
          light: '#2A2A2A',
          dark: '#171717',
        },
        gold: {
          primary: '#FFD700',    // More saturated gold
          secondary: '#FFDF33',  // Brighter secondary
          shadow: '#CC9900',     // Darker shadow for better contrast
        },
        'off-white': '#F5F5F5',
        'light-gray': '#D3D3D3',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 2px 8px 0 rgba(255, 215, 0, 0.4)',
      },
      dropShadow: {
        'gold': '0 0 4px rgba(255, 215, 0, 0.4)',
      },
    },
  },
  plugins: [],
};