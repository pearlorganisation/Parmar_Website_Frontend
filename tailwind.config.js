/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            lineHeight: "1.75",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
