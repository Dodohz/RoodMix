import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff1f1",
          100: "#ffdfdf",
          200: "#ffc5c5",
          300: "#ff9d9d",
          400: "#ff6464",
          500: "#fa3434",
          600: "#e81111",
          700: "#c40c0c",
          800: "#a20f0f",
          900: "#861414",
          950: "#490404",
        },
        accent: {
          50: "#fdf8e9",
          100: "#faedc4",
          200: "#f5d985",
          300: "#f0c14b",
          400: "#edb228",
          500: "#dd9a13",
          600: "#bf760e",
          700: "#985410",
          800: "#7e4214",
          900: "#6b3717",
        },
        ink: {
          DEFAULT: "#1f2933",
          light: "#52606d",
        },
      },
      fontFamily: {
        sans: ["Cairo", "Tajawal", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 30px -10px rgba(0,0,0,0.18)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
