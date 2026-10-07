const fs = require('fs');

const config = `import type { Config } from "tailwindcss";

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
          cream: "#F5F1E8",
          coal: "#171717",
          orange: "#F26A21",
          blue: "#8FB8D8",
          muted: "#77736D",
          bg: "#F5F1E8",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          border: "rgba(23, 23, 23, 0.12)",
          cyan: "#F26A21", /* Legacy mapped to orange */
          teal: "#8FB8D8", /* Legacy mapped to blue */
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "nexora-gradient": "linear-gradient(135deg, #F26A21 0%, #8FB8D8 100%)",
        "nexora-glow": "linear-gradient(135deg, rgba(242, 106, 33, 0.15) 0%, rgba(143, 184, 216, 0.15) 100%)",
        "hero-radial": "radial-gradient(ellipse at 60% 50%, rgba(242, 106, 33, 0.1) 0%, transparent 60%)",
        "card-gradient": "linear-gradient(135deg, #FFFFFF 0%, #F5F1E8 100%)",
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
          "0%": { boxShadow: "0 0 8px rgba(242, 106, 33, 0.2)" },
          "100%": { boxShadow: "0 0 24px rgba(242, 106, 33, 0.4), 0 0 48px rgba(242, 106, 33, 0.15)" },
        },
      },
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(242, 106, 33, 0.2), 0 0 40px rgba(242, 106, 33, 0.1)",
        "card-hover": "0 12px 40px rgba(23, 23, 23, 0.08)",
        glass: "0 4px 24px rgba(23, 23, 23, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
`;

fs.writeFileSync('tailwind.config.ts', config);
