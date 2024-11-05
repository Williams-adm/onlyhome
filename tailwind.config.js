/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      mainTitle: '2.5rem',
      button: '1.2rem'
    },
    extend: {
      colors: {
        buttonGO: 'rgb(251 146 60)'
      },
    },
    

  },
  plugins: [],
}

