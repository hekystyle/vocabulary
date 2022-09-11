module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  settings: {
    jest: {
      // eslint-disable-next-line import/no-extraneous-dependencies, global-require, @typescript-eslint/no-var-requires
      version: require('jest/package.json').version,
    },
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/return-await': ['off', 'in-try-catch'],
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  overrides: [
    {
      files: ['setupTests.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
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
