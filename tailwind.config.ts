import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background, 210 20% 98%))",
        foreground: "hsl(var(--foreground, 222.2 47.4% 11.2%))",
        card: "hsl(var(--card, 0 0% 100%))",
        "card-foreground": "hsl(var(--card-foreground, 222.2 47.4% 11.2%))",
        muted: "hsl(var(--muted, 210 20% 96%))",
        "muted-foreground": "hsl(var(--muted-foreground, 215 16% 46%))",
        border: "hsl(var(--border, 214 32% 91%))",
        primary: "hsl(var(--primary, 222.2 47.4% 11.2%))",
        "primary-foreground": "hsl(var(--primary-foreground, 210 40% 98%))",
      },
      borderRadius: { lg: "0.75rem" },
    },
  },
  plugins: [],
};

export default config;
