/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /bg-(red|green|blue|yellow|amber|black|gray)-(100|200|300|400|500)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}