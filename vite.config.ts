import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
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
