/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "376px",
      },
      fontFamily: {
        quicksand: ["var(--quicksand-font)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#DCA752",
          50: "#FBF5EB",
          100: "#F7ECDA",
          200: "#F1DBB8",
          300: "#EACA96",
          400: "#E3B874",
          500: "#DCA752",
          600: "#CD8E29",
          700: "#9E6E20",
          800: "#6F4D16",
          900: "#412D0D",
        },
      },
    },
  },
  plugins: [],
};
