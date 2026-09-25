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
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        brand: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          light: "#EEF2FF",
          hover: "#4338CA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)",
        "card-hover":
          "0 8px 24px rgba(99,102,241,0.14), 0 2px 8px rgba(0,0,0,0.06)",
        indigo: "0 4px 14px rgba(99,102,241,0.3)",
      },
      borderRadius: {
        card: "12px",
        btn: "10px",
      },
      transitionDuration: {
        "250": "250ms",
      },
    },
  },
  plugins: [],
};
export default config;
