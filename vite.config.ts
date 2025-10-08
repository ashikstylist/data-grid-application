import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    postcss: "./postcss.config.cjs",
  },
  resolve: {
    alias: {
      // Makes 'src' the root for imports
      "@": path.resolve(__dirname, "src"),
    },
  },
});
