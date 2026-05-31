import tailwindColors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontWeight: {
        display: 800,
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
        hub: {
          learn: '#22d3ee',
          'learn-bg': 'rgba(34, 211, 238, 0.10)',
          study: '#34d399',
          'study-bg': 'rgba(52, 211, 153, 0.10)',
          fix: '#fb923c',
          'fix-bg': 'rgba(251, 146, 60, 0.10)',
          build: '#a78bfa',
          'build-bg': 'rgba(167, 139, 250, 0.10)',
          reference: '#94a3b8',
          'reference-bg': 'rgba(148, 163, 184, 0.10)',
        },
        /* ── Hallmark theme-aware accent color family ── */
        hallmark: {
          accent: 'var(--hallmark-accent)',
          'accent-dim': 'var(--hallmark-accent-dim)',
          'accent-glow': 'var(--hallmark-accent-glow)',
          'surface-accent': 'var(--hallmark-surface-accent)',
          'text-accent': 'var(--hallmark-text-accent)',
          /* Hallmark accent colors as static values for static classes */
          amber: 'oklch(0.62 0.19 58)',
          emerald: 'oklch(0.72 0.19 148)',
          rose: 'oklch(0.52 0.22 29)',
          cyan: 'oklch(0.72 0.16 205)',
          blue: 'oklch(0.55 0.18 265)',
        },
        emerald: {
          ...tailwindColors.emerald,
          150: '#d1fae5',
        },
        cyan: {
          ...tailwindColors.cyan,
          150: '#cffafe',
        },
      },
      boxShadow: {
        glow: 'var(--hallmark-shadow-glow, 0 0 0 1px rgba(45, 212, 191, 0.10)), 0 20px 60px rgba(0,0,0,0.35)',
        'glow-sm': '0 0 0 1px rgba(45, 212, 191, 0.08), 0 4px 20px rgba(0,0,0,0.25)',
        'glow-lg': '0 0 0 1px rgba(45, 212, 191, 0.12), 0 30px 80px rgba(0,0,0,0.40)',
        'glow-amber': '0 0 0 1px rgba(251, 191, 36, 0.10), 0 20px 60px rgba(0,0,0,0.35)',
        'glow-cyan': '0 0 0 1px rgba(34, 211, 238, 0.10), 0 20px 60px rgba(0,0,0,0.35)',
        'glow-violet': '0 0 0 1px rgba(167, 139, 250, 0.10), 0 20px 60px rgba(0,0,0,0.35)',
        lift: '0 4px 12px rgba(0,0,0,0.30), 0 1px 3px rgba(0,0,0,0.15)',
        'lift-lg': '0 8px 30px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.15)',
        card: '0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px -1px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s infinite ease-in-out',
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
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(52, 211, 153, 0.15)' },
          '50%': { boxShadow: '0 0 20px rgba(52, 211, 153, 0.30)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.95)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
