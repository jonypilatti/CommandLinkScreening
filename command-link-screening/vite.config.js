import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use Babel for JSX parsing
      babel: {
        plugins: ["@babel/plugin-syntax-jsx"],
      },
    }),
  ],
});
