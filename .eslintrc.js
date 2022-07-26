module.exports = {
  extends: ['george-lint/typescript'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  settings: {
    jest: {
      // eslint-disable-next-line import/no-extraneous-dependencies, global-require, @typescript-eslint/no-var-requires
      version: require('jest/package.json').version,
    },
  },
  overrides: [
    {
      files: ['**/*.spec.ts'],
      extends: ['plugin:jest/all'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
      rules: {
        'jest/require-top-level-describe': 'off',
      },
    },
  ],
};
