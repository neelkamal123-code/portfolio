/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F14',
        surface: '#111720',
        'surface-2': '#161D27',
        border: 'rgba(255,255,255,0.06)',
        'border-hover': 'rgba(255,255,255,0.12)',
        muted: '#4A5568',
        subtle: '#2D3748',
        text: '#E2E8F0',
        'text-muted': '#718096',
        'text-faint': '#4A5568',
        accent: '#CBD5E0',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.42, 0, 0.58, 1)',
      },
    },
  },
  plugins: [],
};
