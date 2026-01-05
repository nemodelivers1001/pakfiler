/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        'pak-green': {
          50: '#effbf4',
          100: '#dbf7e3',
          200: '#b7edca',
          300: '#82e0a6',
          400: '#46cc7e',
          500: '#16a049',
          600: '#15823e',
          700: '#126833',
          800: '#13522c',
          900: '#114326',
          950: '#072516',
          brand: '#0E5630',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  },
  plugins: [],
};
