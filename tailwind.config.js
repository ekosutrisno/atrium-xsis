const path = require("path");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    path.resolve(__dirname, "./node_modules/litepie-datepicker/**/*.js"),
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "color-gray-darkest": "#2e3c42",
        "color-gray-darker": "#646e73",
        "color-gray-dark": "#7e878b",
        "color-gray-default": "#a4aaad",

        "color-gray-light": "#eaebec",
        "color-gray-lighter": "#f5f5f5",
        "color-gray-lightest": "#f9fafa",

        "color-dark-gray-darkest": "#16262c",
        "color-dark-gray-darker": "#1b2b32",
        "color-dark-gray-dark": "#243238",
        "color-dark-gray-default": "#48565b",

        "color-dark-gray-light": "#7e878b",
        "color-dark-gray-lighter": "#a4aaad",
        "color-dark-gray-lightest": "#eaebec",

        "color-dark-black-darker": "#021117",
        "color-dark-black-default": "#0e1e25",

        "litepie-primary": colors.lightBlue, // color system for light mode
        "litepie-secondary": colors.coolGray, // color system for dark mode
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      textOpacity: ["disabled"],
      textColor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
