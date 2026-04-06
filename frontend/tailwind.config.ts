import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f7f4ee",
        ink: "#1f2933",
        sunrise: "#f59e0b",
        lake: "#0ea5a2",
        clay: "#b45309",
        mint: "#99f6e4"
      },
      boxShadow: {
        halo: "0 0 0 4px rgba(14,165,162,0.2), 0 10px 24px rgba(0,0,0,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
