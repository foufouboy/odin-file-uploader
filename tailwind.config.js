/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./public/**/*.{css, js}",
    "./views/**/*.pug",
  ],
  theme: {
    fontFamily: {
      display: ["Inter", "system-ui", "sans-serif"] 
    },
    extend: {
      screens: {
        // TODO
      },
      colors: {
        "purple": "#3157DA",
        "purple-dark": "rgb(34 61 155)",
        "light-grey": "#F6F6F6",
        "border-grey": "#EEEDF2",
        "grey": "#686868"
      },
      borderRadius: {
        DEFAULT: ".25rem",
      },
    },
  },
  plugins: [],
}

