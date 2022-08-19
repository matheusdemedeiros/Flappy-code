import { resolve } from "path";
import { defineConfig } from "vite";


const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  base: "/Flappy-code/",
  root: root,
  build: {
    outDir: outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
      },
    },
  },
  publicDir: "../public"
});
