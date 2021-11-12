const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      // primary: 'var(--color-primary)',
      primary: colors.orange,
      secondary: colors.blue,
      // ...colors,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
