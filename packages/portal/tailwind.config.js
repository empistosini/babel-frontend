const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      orange: colors.orange,
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
