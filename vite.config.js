import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use Babel for JSX parsing
      babel: {
        plugins: ["@babel/plugin-syntax-jsx"],
      },
    }),
    qrcode(),
  ],
});
