/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d6fe",
          300: "#a4bafd",
          400: "#7b93fb",
          500: "#5b6ef7",
          600: "#4a50ee",
          700: "#3d3dd3",
          800: "#3234aa",
          900: "#2d3186",
        },
        accent: {
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        skillsphere: {
          primary: "#5b6ef7",
          "primary-focus": "#4a50ee",
          "primary-content": "#ffffff",
          secondary: "#ec4899",
          "secondary-focus": "#db2777",
          "secondary-content": "#ffffff",
          accent: "#06d6a0",
          "accent-focus": "#05b384",
          "accent-content": "#ffffff",
          neutral: "#1e1e2e",
          "neutral-focus": "#16162a",
          "neutral-content": "#e2e8f0",
          "base-100": "#0f0f1a",
          "base-200": "#16162a",
          "base-300": "#1e1e3a",
          "base-content": "#e2e8f0",
          info: "#38bdf8",
          success: "#06d6a0",
          warning: "#f59e0b",
          error: "#f43f5e",
        },
      },
    ],
    darkTheme: "skillsphere",
    base: true,
    styled: true,
    utils: true,
  },
};
