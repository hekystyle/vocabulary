import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      reportsDirectory: join(__dirname, 'coverage', 'unit'),
    },
  },
  plugins: [
    tsconfigPaths({}),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  esbuild: false,
});
