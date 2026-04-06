/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        P400: "#F5AFAF",
      },
      width: {
        card: "335px",
      },
      height:{
        card: "60px",
      }
    },
  },
  plugins: [],
};