/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#51C6F3",
      },
      fontFamily: {
        bebasNeue: ["bebasNeue", "sans-serif"],
      },
      screens: {
        'antd-lg': '992px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
