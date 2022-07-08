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
        '45%': '49.5%',
        '95%': '95%',
        '25vw': '22vw',
        '50vw': '35vw',
        'fullVh': '60vw',
      },
    },
    plugins: []
  }
}