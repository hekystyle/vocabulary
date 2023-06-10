import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      manifest: false, // disable manifest generation
    }),
  ],
});
