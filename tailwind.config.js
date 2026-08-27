/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        justco: {
          blue: '#21B5FF',
          'blue-dark': '#0099FF',
          'blue-light': '#54C7FF',
          'blue-tint': '#EBF7FF',
          'blue-soft': '#D6F0FF',
          charcoal: '#000105',
          'charcoal-soft': '#0B121E',
          'grey-light': '#F4F6F9',
          'grey-surface': '#FFFFFF',
          'grey-border': '#E2E8F0',
          'grey-muted': '#64748B',
          teal: '#21B5FF',
          'teal-dark': '#0099FF',
          'teal-light': '#54C7FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px -3px rgba(33, 181, 255, 0.35)',
        'glow-teal': '0 0 20px -3px rgba(33, 181, 255, 0.35)',
        'card-elevated': '0 10px 25px -5px rgba(0, 1, 5, 0.08), 0 0 1px 1px rgba(0, 1, 5, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
