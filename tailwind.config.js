/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-in-out",
        fadeOutDown: "fadeOutDown 0.5s ease-in-out",
      },
      colors: {
        primary: "#0c2074",
        secondary: "#86d2ed",
      },
    },
  },
  plugins: [],
};
