/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm2': '420px',
      'sm3':'520px',
      'sm': '640px',
      'md':'768px',
      'md2': '820px',
      'lg':	'1024px',
      'xl':'1280px',
      '2xl':'1536px',
    },
    extend: {
      colors: {
          'yellow-pokemon': '#FFCC01',
          'blue-space': '#273860',
          'hTransp': 'rgb(0,0,0,0.8)',
          'transp': 'rgb(0,0,0,0)',
          'half-transp': 'rgb(0,0,0,0.8)',
          'min-transp': 'rgb(0,0,0,0.6)',
          'mini-transp': 'rgb(0,0,0,0.4)',
          'lilas': '#363775',
        },
      backgroundImage: {
        'wallpaper-lilas':"url('../src/imagens/wallpaper/wallpaper.jpg')",
      },
      rotate: {
        '45deg': '-45deg',
      },
      spacing: {
        '25%': '24.4%',
        '24%': '23.9%',
        '45%': '49.5%',
        '95%': '95%',
        '25vw': '18vw',
        '50vw': '35vw',
        'fullVh': '60vw',
        '20vh': '20vh',
        '30vh': '30vh',
        '60vh': '60vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '85vh': '85vh',
        '120vh': '120vh',
        'brown-mewtwo': '#201211',
        'light-mewtwo': '#674C37',

      },
    },
    plugins: []
  }
}
