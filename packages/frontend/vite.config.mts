import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  test: {
    include: ['{src,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['./tests/setupTests.ts'],
    environment: 'jsdom',
  },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      manifest: false, // disable manifest generation
    }),
  ],
});
