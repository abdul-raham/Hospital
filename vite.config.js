import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true, // Enable Hot Module Replacement for a better development experience
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Correct backend server URL
        changeOrigin: true, // Ensures the host header matches the target URL
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' prefix when forwarding to the backend
      },
    },
  },
});
