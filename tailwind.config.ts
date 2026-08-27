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
        nexora: {
          bg: "#0B0F19",
          surface: "#121623",
          card: "#1A202C",
          border: "#2D3748",
          cyan: "#00F2FE",
          teal: "#00D2C4",
          muted: "#94A3B8",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "nexora-gradient": "linear-gradient(135deg, #00F2FE 0%, #00D2C4 100%)",
        "nexora-glow": "linear-gradient(135deg, #00F2FE22 0%, #00D2C422 100%)",
        "hero-radial":
          "radial-gradient(ellipse at 60% 50%, #00F2FE18 0%, transparent 60%)",
        "card-gradient":
          "linear-gradient(135deg, #1A202C 0%, #121623 100%)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-2": "marquee2 30s linear infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        glow: "glow 2s ease-in-out infinite alternate",
        "counter-up": "counterUp 0.4s ease forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 8px #00F2FE44" },
          "100%": { boxShadow: "0 0 24px #00F2FE99, 0 0 48px #00F2FE33" },
        },
      },
      boxShadow: {
        "cyan-glow": "0 0 20px #00F2FE44, 0 0 40px #00F2FE22",
        "card-hover": "0 8px 32px rgba(0,242,254,0.12)",
        glass: "0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
