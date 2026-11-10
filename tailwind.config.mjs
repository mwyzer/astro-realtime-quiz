/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6C5CE7',
          pink: '#FD79A8',
          yellow: '#FDCB6E',
          cyan: '#00CEC9',
          dark: '#0F172A',
        },
        quiz: {
          red: '#EF4444',
          blue: '#3B82F6',
          yellow: '#F59E0B',
          green: '#10B981',
        },
      },
      animation: {
        'bounce-short': 'bounce 0.5s ease-in-out 2',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
