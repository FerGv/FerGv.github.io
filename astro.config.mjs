import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  outDir: "docs",
  vite: {
    plugins: [tailwindcss()],
  },
});
