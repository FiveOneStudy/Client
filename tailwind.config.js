/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        White : "#FFFFFF",
        P100: "#FCF8F8",
        P300: "#F9DFDF",
        P400: "#F5AFAF",
        G200: "#CDCDCF",
        G300: "#B4B5B7",
        G500: "#828387",
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