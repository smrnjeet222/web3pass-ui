import { shadcnPreset } from "./src/lib/tw/presets";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  presets: [shadcnPreset],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
};
