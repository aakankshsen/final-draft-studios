import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D0D",
        paper: "#EDEAE0",
        amber: "#F5A623",
        dim: "#948F80",
        keyframes: {
        bob: {
          "0%, 100%": { transform: "rotate(45deg) translate(0,0)" },
          "50%": { transform: "rotate(45deg) translate(3px,-3px)" },
        },
      },
      animation: {
        bob: "bob 1.6s infinite",
      },
      },
        fontFamily: {
        display: ["var(--font-gilroy)", "sans-serif"],
        body: ["var(--font-gilroy)", "sans-serif"],
        mono: ["var(--font-gilroy)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;