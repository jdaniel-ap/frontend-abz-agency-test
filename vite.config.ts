import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    headers: {
      // Security headers for development
      "Strict-Transport-Security":
        "max-age=31536000; includeSubDomains; preload",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "0",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; base-uri 'self';",
    },
  },
  preview: {
    headers: {
      // Security headers for preview mode
      "Strict-Transport-Security":
        "max-age=31536000; includeSubDomains; preload",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "0",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; base-uri 'self';",
    },
  },
});
