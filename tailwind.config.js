/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        ink: {
          950: '#06080d',
          900: '#0b1018',
          850: '#101722',
          800: '#182234',
          750: '#1c2a42',
        },
        dojo: {
          bg: '#06080d',
          surface: '#0b1018',
          card: '#101722',
          border: 'rgba(148, 163, 184, 0.12)',
          'border-hover': 'rgba(148, 163, 184, 0.25)',
        },
        emerald: {
          ...require('tailwindcss/colors').emerald,
          150: '#d1fae5',
        },
        cyan: {
          ...require('tailwindcss/colors').cyan,
          150: '#cffafe',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(45, 212, 191, 0.10), 0 20px 60px rgba(0,0,0,0.35)',
        'glow-sm': '0 0 0 1px rgba(45, 212, 191, 0.08), 0 4px 20px rgba(0,0,0,0.25)',
        'glow-lg': '0 0 0 1px rgba(45, 212, 191, 0.12), 0 30px 80px rgba(0,0,0,0.40)',
        card: '0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px -1px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
}
