/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}