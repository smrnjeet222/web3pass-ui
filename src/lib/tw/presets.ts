import animatePlugin from "tailwindcss-animate";
import type { Config } from "tailwindcss";
import { glassPlugin } from "./plugins/glass";
import { shadcnPlugin } from "./plugins/shadcn";

export const shadcnPreset = {
  darkMode: ["class"],
  content: [],
  plugins: [animatePlugin, glassPlugin, shadcnPlugin],
} satisfies Config;
