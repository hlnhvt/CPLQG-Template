/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: 'rgb(var(--tw-white) / <alpha-value>)',
        black: 'rgb(var(--tw-black) / <alpha-value>)',
        gray: {
          50: 'rgb(var(--tw-gray-50) / <alpha-value>)',
          100: 'rgb(var(--tw-gray-100) / <alpha-value>)',
          200: 'rgb(var(--tw-gray-200) / <alpha-value>)',
          300: 'rgb(var(--tw-gray-300) / <alpha-value>)',
          400: 'rgb(var(--tw-gray-400) / <alpha-value>)',
          500: 'rgb(var(--tw-gray-500) / <alpha-value>)',
          600: 'rgb(var(--tw-gray-600) / <alpha-value>)',
          700: 'rgb(var(--tw-gray-700) / <alpha-value>)',
          800: 'rgb(var(--tw-gray-800) / <alpha-value>)',
          900: 'rgb(var(--tw-gray-900) / <alpha-value>)',
        },
        blue: {
          50: 'rgb(var(--tw-blue-50) / <alpha-value>)',
          100: 'rgb(var(--tw-blue-100) / <alpha-value>)',
          200: 'rgb(var(--tw-blue-200) / <alpha-value>)',
          300: 'rgb(var(--tw-blue-300) / <alpha-value>)',
          400: 'rgb(var(--tw-blue-400) / <alpha-value>)',
          500: 'rgb(var(--tw-blue-500) / <alpha-value>)',
          600: 'rgb(var(--tw-blue-600) / <alpha-value>)',
          700: 'rgb(var(--tw-blue-700) / <alpha-value>)',
          800: 'rgb(var(--tw-blue-800) / <alpha-value>)',
          900: 'rgb(var(--tw-blue-900) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--tw-blue-800) / <alpha-value>)',
          light: 'rgb(var(--tw-blue-600) / <alpha-value>)',
          dark: 'rgb(var(--tw-blue-900) / <alpha-value>)',
        },
        red: {
          500: 'rgb(var(--tw-red-500) / <alpha-value>)',
        },
        yellow: {
          300: 'rgb(var(--tw-yellow-300) / <alpha-value>)',
        }
      },
      backgroundImage: {
        'gradient-header': 'linear-gradient(135deg, var(--bg-header-top) 0%, var(--bg-header-bottom) 100%)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(25px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(25px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out both',
        slideUpFade: 'slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        slideInRight: 'slideInRight 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
