/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fce7f3', // pink-100 base
        surface: '#fff1f2', // rose-50
        primary: '#be123c', // rose-700
        secondary: '#4c0519', // rose-950 for very dark warm text
        accent: '#fb7185', // rose-400
      },
      fontFamily: {
        sans: ['"Playfair Display"', 'Georgia', 'serif'], // Soft elegant serif
        cinematic: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}