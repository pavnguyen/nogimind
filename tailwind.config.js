/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#06080d',
          900: '#0b1018',
          850: '#101722',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(45, 212, 191, 0.12), 0 20px 60px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
