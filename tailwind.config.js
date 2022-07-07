/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '25%': '24.4%',
        '45%': '49.5%',
        '95%': '95%',
      },
    },
    plugins: []
  }
}