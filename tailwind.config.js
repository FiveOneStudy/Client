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
        box: "500px",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        noto: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};