import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Stitch DESIGN.md: Inter exclusively for clean, systematic feel
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        // Stitch: label-caps 0.1em tracking
        caps: '0.1em',
        // Stitch: display -0.04em
        display: '-0.04em',
        tight2: '-0.02em',
      },
      colors: {
        // Stitch primary accent: Electric Emerald
        emerald: {
          stitch: '#00ffc2',
          dim: '#00e1ab',
          dark: '#007255',
        }
      }
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: "#f8fafc",
          foreground: "#0f172a",
          primary: {
            DEFAULT: "#00a97e",
            foreground: "#ffffff",
          }
        }
      },
      dark: {
        // Stitch DESIGN.md: Aetheric Minimalist - Obsidian dark surfaces
        colors: {
          background: "#0c0f0f",   // surface-container-lowest
          foreground: "#e2e2e2",   // on-surface
          primary: {
            // Electric Emerald - THE signature accent
            DEFAULT: "#00ffc2",
            foreground: "#003828",
          },
          secondary: {
            DEFAULT: "#c9c6c5",
            foreground: "#313030",
          },
          focus: "#00ffc2",
        }
      }
    }
  })],
};
