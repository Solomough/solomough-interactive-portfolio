import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"]
      },
      colors: {
        ink: "#08090b",
        paper: "#e9e4d9",
        electric: "#b5ff65"
      },
      boxShadow: {
        glow: "0 0 60px rgba(181,255,101,.12)"
      }
    }
  },
  plugins: []
};
export default config;
