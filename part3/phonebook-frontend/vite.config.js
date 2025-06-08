import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/phonebook/",
  server: {
    proxy: {
      "/phonebook/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
