/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C5A059',
          light: '#E5C16C',
          dark: '#8E6F2E',
          accent: '#F3D48B',
          glow: 'rgba(197, 160, 89, 0.35)',
        },
        charcoal: {
          950: '#07080B',
          900: '#0A0C10',
          850: '#0E1117',
          800: '#121620',
          700: '#1B202C',
          600: '#262D3D',
        },
        ivory: {
          light: '#FFFFFF',
          DEFAULT: '#F3EFE6',
          muted: '#E2DDD3',
          dark: '#B8C0D0',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        body: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      animation: {
        'ping-slow': 'ping-slow 2.8s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
      keyframes: {
        'ping-slow': {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.7)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      }
    },
  },
  plugins: [],
}
