/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        LandingFont: ["Londrina Shadow", "sans-serif"],
        DashboardFont: ["Sour Gummy", "sans-serif"],
        TitleFont: ["Funnel Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
