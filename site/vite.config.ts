import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// base "./" makes the built site work from any folder or GitHub Pages sub-path.
// Two pages: the portfolio (index.html) and the link page (links/index.html -> /links/).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        links: resolve(__dirname, "links/index.html"),
      },
    },
  },
});
