import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CountdownLib",
      fileName: "index",
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    copyPublicDir: false,
  },
});
