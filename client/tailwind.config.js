/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require('flowbite/plugin'),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      "corporate",
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "dracula",
      "cmyk",
      "autumn",
      "acid",
      "lemonade",
      "winter",
    ],
  },
}