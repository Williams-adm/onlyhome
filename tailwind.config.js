/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      mainTitle: '2.2rem',
      button: '1.2rem'
    },
    extend: {
      colors: {
        buttonGO: 'rgb(251 146 60)'
      },
      gridTemplateColumns: {
        'layout-cols': '0.5fr 1fr 1fr 1fr 1fr',
      },
      gridTemplateRows: {
        'layout-rows': '0.4fr 1fr 1fr 1fr 1fr 1fr'
      }
    },
    

  },
  plugins: [],
}

