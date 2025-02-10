/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dashboard-dark': '#0A0B1E',
        'dashboard-accent': '#2563EB',
        'dashboard-accent-glow': '#3B82F6',
        'dashboard-secondary': '#6366F1',
        'dashboard-surface': '#111827',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #2563EB, 0 0 10px #2563EB, 0 0 15px #2563EB' },
          '100%': { boxShadow: '0 0 10px #3B82F6, 0 0 20px #3B82F6, 0 0 30px #3B82F6' },
        },
      },
    },
  },
  plugins: [],
}
