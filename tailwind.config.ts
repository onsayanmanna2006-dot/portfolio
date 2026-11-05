import type { Config } from "tailwindcss";

/**
 * Theme palette. Keep in sync with the CSS variables in app/globals.css
 * (hex values here so Tailwind opacity modifiers like `bg-forest/50` work).
 * Crimson is reserved for accents (CTAs, highlights, hover, active nav, stats).
 * `crimson.bright` is a lighter tint used when crimson is applied to *text*,
 * so it keeps WCAG-friendly contrast on the dark background.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      colors: {
        charcoal: "#171717", // main background
        forest: {
          DEFAULT: "#06110c", // deep sections / cards
          light: "#0d2419",
        },
        crimson: {
          DEFAULT: "#A31C1B", // accents
          bright: "#F05252", // text-safe tint (~5:1 contrast on charcoal)
          dark: "#7d1515",
        },
        ink: "#EDEDED", // primary text
        muted: "#A3A3A3", // secondary text
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(163,28,27,0.35), 0 8px 40px -8px rgba(163,28,27,0.45)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%, -4%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%, 5%, 0) scale(0.95)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite",
        "drift-slow": "drift 34s ease-in-out infinite reverse",
        gradient: "gradient 18s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
