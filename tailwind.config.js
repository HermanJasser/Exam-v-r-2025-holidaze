/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primBG: "#FFFFFF",
        sekBG: "#F9F8F8",
        primGreen: "#247045",
        sekGreen: "#30975d",
        textPrim: "#1E1E1E",
        textSek: "#545454",
        redPrim: "#E33030",
        redSek: "#AB2020",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
