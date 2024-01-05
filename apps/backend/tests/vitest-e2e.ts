import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globalSetup: [join(__dirname, 'setup-db.ts')],
    setupFiles: [join(__dirname, 'setup-test.ts')],
    include: ['tests/**/*.e2e-{test,spec}.ts'],
    coverage: {
      reportsDirectory: join(__dirname, '..', 'coverage', 'e2e'),
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
