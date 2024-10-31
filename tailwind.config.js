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
      }
    },
  },
  plugins: [],
}