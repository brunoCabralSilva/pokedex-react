/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm2': '420px',
      'sm': '640px',
      'md2': '820px',
    },
    extend: {
      spacing: {
        '25%': '24.4%',
        '24%': '23.9%',
        '45%': '49.5%',
        '95%': '95%',
        '25vw': '18vw',
        '50vw': '35vw',
        'fullVh': '60vw',
        'brown-mewtwo': '#201211',
        'light-mewtwo': '#674C37',

      },
      backgroundImage: {
        'mewtwo': "url('https://wallpaperaccess.com/full/493965.jpg')",
        'gradient-mewtwo': "url('../src/imagens/gradient.png')",
      }
    },
    plugins: []
  }
}
