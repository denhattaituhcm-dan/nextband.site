import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: path.resolve(__dirname, "."),
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    emptyOutDir: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, "/");
          if (norm.includes("node_modules")) {
            if (norm.includes("react-dom") || norm.includes("react-router-dom") || norm.includes("/react/")) {
              return "vendor-react";
            }
            if (norm.includes("@tanstack/react-query")) {
              return "vendor-query";
            }
            if (norm.includes("@supabase/supabase-js")) {
              return "vendor-supabase";
            }
            if (norm.includes("lucide-react")) {
              return "vendor-lucide";
            }
            if (norm.includes("@radix-ui")) {
              return "vendor-radix";
            }
            if (norm.includes("date-fns")) {
              return "vendor-date-fns";
            }
            if (norm.includes("/zod/")) {
              return "vendor-zod";
            }
          }
        },
      },
    },
  },
}));
