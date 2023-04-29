/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/**/index.ts', '!src/**/__tests__/*.ts'],
  modulePaths: ['<rootDir>/src'],
  preset: 'ts-jest/presets/js-with-ts-esm',
  roots: ['<rootDir>/src'],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  transformIgnorePatterns: ['/node_modules/(?!(dexie)/)'],
};

export default config;
