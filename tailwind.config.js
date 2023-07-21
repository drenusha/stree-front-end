/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    sm: { max: "350px" },
    extend: {
      fontFamily: {
        primary: ["Poppins"],
      },
    },
  },
  plugins: [],
};
