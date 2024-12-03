/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2'
      },
      colors: {
        primary: '#E8DEF8',
        secondary: '#4A4459',
        tertiary: '#65558F',
        button: '#D7C9ED'
      }
    },
  },
  plugins: [],
}