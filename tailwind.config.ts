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
        background: "var(--background)",
        foreground: "var(--foreground)",
        Sky: "#C3EBFA",
        SkyLight: "#EDF9FD",
        Purple: "#CFCEFF",
        PurpleLight: "#F1F0FF",
        Yellow: "#FAE27C",
        YellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
};
export default config;
