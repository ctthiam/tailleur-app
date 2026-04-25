import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terra: {
          50:  "#fdf3ed",
          100: "#fae0cc",
          200: "#f4bb96",
          300: "#ec9260",
          400: "#e06d38",
          500: "#C0622A",
          600: "#a34e20",
          700: "#833d19",
          800: "#5e2c12",
          900: "#3a1b0b",
        },
        foret: {
          50:  "#edf3e8",
          100: "#d0e2c4",
          200: "#a5c88a",
          300: "#74a850",
          400: "#4d8530",
          500: "#2D5016",
          600: "#244010",
          700: "#1b310c",
          800: "#122208",
          900: "#091403",
        },
        or: {
          50:  "#fdf9ec",
          100: "#faefc8",
          200: "#f4da89",
          300: "#edc14a",
          400: "#e4a81f",
          500: "#D4A017",
          600: "#b07e0e",
          700: "#895e09",
          800: "#614106",
          900: "#3a2703",
        },
        creme: {
          50:  "#FFFFFF",
          100: "#FAF6F1",
          200: "#F3EBE0",
          300: "#E8D9C8",
          400: "#D9C3A8",
          500: "#C9AC88",
        },
        brun: {
          900: "#2C1810",
          800: "#3d2318",
          700: "#573325",
          600: "#704535",
          500: "#8a5845",
          400: "#a87a65",
          300: "#c4a08e",
          200: "#ddc5b8",
          100: "#f2e8e3",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(44,24,16,0.10)",
        "card-lg": "0 8px 32px 0 rgba(44,24,16,0.15)",
        warm: "0 4px 24px 0 rgba(192,98,42,0.18)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
