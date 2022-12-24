/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minHeight: {
      '75vh': '75vh',
      '70vh': '70vh',
    },
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
      transitionProperty: {
        'width': 'width',
      },
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
        'wallpaper-lilas':"url('../src/imagens/wallpaper/03.jpg')",
      },
      rotate: {
        '45deg': '-45deg',
      },
      spacing: {
        '1%': '2%',
        '19vh': '19vh',
        '99%':'98.5%',
        '98.7%':'98.7%',
        '98%':'98%',
        '25%': '24.4%',
        '24%': '23.9%',
        '45%': '49.5%',
        '24vh': '24vh',
        '48vh': '48vh',
        '49vh': '49vh',
        '95%': '95%',
        '25vw': '18vw',
        '50vw': '35vw',
        'fullVh': '60vw',
        '20vh': '20vh',
        '30vh': '30vh',
        '35vh': '34vh',
        '60vh': '60vh',
        '75vh': '75vh',
        '40vh': '40vh',
        '45vh':'45vh',
        '47vh':'47vh',
        '50vh': '50vh',
        '85vh': '85vh',
        '95vh': '95vh',
        '120vh': '120vh',
        'brown-mewtwo': '#201211',
        'light-mewtwo': '#674C37',
      },
    },
    plugins: []
  }
}
