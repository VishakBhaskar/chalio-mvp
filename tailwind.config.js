/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mexican-red': '#E63946',
        'mexican-orange': '#F77F00',
        'mexican-yellow': '#FCBF49',
        'mexican-brown': '#8B4513',
        'warm-beige': '#F5DEB3',
      },
    },
  },
  plugins: [],
}
