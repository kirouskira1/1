import { componentTagger } from "lovable-tagger";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  build: { outDir: 'docs' },
  server: {
    host: "localhost",
    port: 8080,
    open: true,
    strictPort: true,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
