import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/goit-react-hw-04-images/", // numele repo-ului tău GitHub
  plugins: [react()],
});
