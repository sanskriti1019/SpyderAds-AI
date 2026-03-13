import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        cream: "#F7F3EC",
        "soft-black": "#1A1A1A",
        maroon: "#6E2C2C",
        beige: "#EDE3D5",
        "warm-grey": "#D8D2C6",
        background: "#F7F3EC",
        foreground: "#1A1A1A",
        card: "#ffffff",
        "card-foreground": "#1A1A1A",
        muted: "#EDE3D5",
        "muted-foreground": "#6b7280",
        border: "#D8D2C6",
        primary: "#6E2C2C",
        "primary-foreground": "#F7F3EC",
      },
      borderRadius: { lg: "0.75rem" },
    },
  },
  plugins: [],
};

export default config;
