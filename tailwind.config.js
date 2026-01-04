/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#137fec",
        backgroundLight: "#f6f7f8",
        backgroundDark: "#101922",
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"],
        "body": ["Public Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}