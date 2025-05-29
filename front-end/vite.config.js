import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/chatbotai": { target: "https://v55-tier2-team-26.onrender.com" },
    },
    cors: {
      origin: "https://deploy-preview-27--celebrated-bienenstitch-a518bd.netlify.app/"
    }
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
