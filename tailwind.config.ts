import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2563eb",
        greenCustom: "#18a44c",
        redCustom: "#dc2626",
        yellowCustom: "#facc15",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        monserrat: ["var(--font-monserrat)"],
        spectral: ["var(--font-spectral)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
