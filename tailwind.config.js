/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class", // نستخدم class strategy
  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
      colors: {
        // إذا بدك ألوان مخصصة ضعها هنا
      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
  ],
}
