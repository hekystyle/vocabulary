module.exports = {
  plugins: ['jest'],
  extends: ['george-lint/typescript', 'plugin:jest/all'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  env: {
    'jest/globals': true,
  },
  settings: {
    jest: {
      // eslint-disable-next-line import/no-extraneous-dependencies,  global-require, @typescript-eslint/no-var-requires
      version: require('jest/package.json').version,
    },
  },
  rules: {
    'jest/require-top-level-describe': 'off',
  },
};
