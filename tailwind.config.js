/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2a4262",
          "secondary": "#7fa0d9",
          "base-100": "#f1f2f6",
        },
      },
      "dark",
      "cupcake"
    ],
  },
  plugins: [require("daisyui")],
}

