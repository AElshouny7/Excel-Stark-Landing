/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'];
export const theme = {
  extend: {
    colors: {
      industrial: {
        blue: '#1E3A8A',
        orange: '#EF6C00',
        steel: '#374151',
        epoxy: '#F9FAFB',
        danger: '#B91C1C'
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['"Source Code Pro"', 'ui-monospace', 'SFMono-Regular']
    },
    maxWidth: {
      '8xl': '90rem'
    },
    boxShadow: {
      card: '0 18px 45px rgba(15, 23, 42, 0.25)'
    }
  },
  container: {
    center: true,
    padding: '1.5rem'
  }
};
export const plugins = [];
