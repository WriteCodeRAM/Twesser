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
        "light-blue": "#f0f4f8",
        "vibrant-teal": "#32deaa",
        "dark-gray": "#333333",
        "soft-orange": "#ff6b6b",
        "muted-red": "#e57373",
        "muted-blue": "#64b5f6",
        "muted-green": "#81c784",
        "muted-purple": "#b39ddb",
        gold: "#FFD700",
        platinum: "#F7E7CE",
        bronze: "#CD7F32",
      },
    },
    fontFamily: {
      roboto: ["var(--font-roboto)"],
      madimi: ["Madimi One", "cursive"],
    },
  },
  plugins: [],
};
export default config;
