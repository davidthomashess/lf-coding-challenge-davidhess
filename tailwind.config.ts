import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-grey-blue": "#5F7579",
        "light-grey-blue": "#C0CCD1",
      },
      fontFamily: {
        xnumbers: ["xnumbers", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
