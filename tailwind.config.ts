import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        "background-secondary": "#F9FAFB",
        primary: "#3F3CBB",
        "light-primary": "#7572E8",
        text: "#1F2937",
        "text-secondary": "#4A4A68",
        "text-muted": "#94A3B8",
        gray: {
          900: "#0c0c0d",
          800: "#18181a",
          700: "#1f2937",
          200: "#e2e8f0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
