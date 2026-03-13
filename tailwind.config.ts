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
      borderRadius: { lg: "0.75rem", xl: "1rem", "2xl": "1.25rem", "3xl": "1.5rem" },
      boxShadow: {
        "glow-maroon": "0 0 18px 4px rgba(110, 44, 44, 0.12)",
        "glow-sm": "0 0 8px 2px rgba(110, 44, 44, 0.08)",
        "card-hover": "0 8px 32px rgba(110,44,44,0.09), 0 2px 8px rgba(0,0,0,0.06)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(110, 44, 44, 0.0)" },
          "50%": { boxShadow: "0 0 18px 4px rgba(110, 44, 44, 0.12)" },
        },
        "stagger-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 4s ease-in-out infinite",
        glow: "glow-pulse 3s ease-in-out infinite",
        "stagger-in": "stagger-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
