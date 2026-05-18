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
        "purple-neon": "#A855F7",
        "purple-dark": "#7C3AED",
        "neon-glow": "#C084FC",
        "bg-game": "#08080F",
        "bg-card": "#0F0F1A",
        "border-game": "#1A1A2E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        glitch: "glitch 2s steps(1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "particle-float": "particle-float 8s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "typing-cursor": "typing-cursor 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px #7C3AED, 0 0 40px #7C3AED44",
          },
          "50%": {
            boxShadow: "0 0 40px #A855F7, 0 0 80px #A855F744, 0 0 120px #A855F722",
          },
        },
        glitch: {
          "0%": { transform: "translate(0)", clipPath: "inset(0 0 100% 0)" },
          "5%": { transform: "translate(-3px, 2px)", clipPath: "inset(20% 0 60% 0)" },
          "10%": { transform: "translate(3px, -1px)", clipPath: "inset(50% 0 30% 0)" },
          "15%": { transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
          "85%": { transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
          "90%": { transform: "translate(2px, 1px)", clipPath: "inset(10% 0 80% 0)" },
          "95%": { transform: "translate(-2px, -1px)", clipPath: "inset(70% 0 10% 0)" },
          "100%": { transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.6" },
          "33%": { transform: "translateY(-30px) rotate(120deg)", opacity: "1" },
          "66%": { transform: "translateY(15px) rotate(240deg)", opacity: "0.8" },
        },
        "typing-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "purple-glow": "radial-gradient(ellipse at center, #7C3AED22 0%, transparent 70%)",
      },
      boxShadow: {
        "neon-sm": "0 0 10px #A855F7, 0 0 20px #A855F744",
        "neon-md": "0 0 20px #A855F7, 0 0 40px #A855F744, 0 0 60px #A855F722",
        "neon-lg": "0 0 40px #A855F7, 0 0 80px #A855F744, 0 0 120px #A855F722",
        "card-hover": "0 0 30px #7C3AED33, 0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
