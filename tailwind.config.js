/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Sora", "serif"],
        body: ["Lato", "serif"],
      }
    },
  },
  plugins: [],
}

