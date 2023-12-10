/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
      "./index.html",
      "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
        'white': '#ffffff',
        'green': '#1db954',
        'lightgrey': '#d3d3d3'
    },
    extend: {},
  },
  plugins: [],
}

