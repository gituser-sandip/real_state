export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#151716",
        mist: "#f4f1ea",
        linen: "#fbfaf7",
        clay: "#a6674f",
        moss: "#445047",
        brass: "#b08a4d",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 22px 70px rgba(21, 23, 22, 0.14)",
      },
    },
  },
  plugins: [],
};
