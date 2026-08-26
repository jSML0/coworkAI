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
          dark: '#0B0F15',
          card: '#131822',
          surface: '#1A212D',
          hover: '#222B3A',
          border: '#273142',
          teal: '#00D2B4',
          'teal-dark': '#009F89',
          'teal-light': '#36ECD2',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          indigo: '#6366F1',
          gold: '#F59E0B',
          muted: '#8B98A9',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px -3px rgba(0, 210, 180, 0.35)',
        'glow-indigo': '0 0 20px -3px rgba(99, 102, 241, 0.35)',
        'card-elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
