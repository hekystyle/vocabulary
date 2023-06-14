module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'airbnb-typescript',
    'plugin:eslint-comments/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json', './cypress/tsconfig.json'],
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
    'arrow-body-style': 'error',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: '{components,containers,filter,routes,services,types,utils}/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'object'],
      },
    ],
    '@typescript-eslint/return-await': ['error', 'always'],
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNullish: true }],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array-simple' }],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        reservedFirst: true,
      },
    ],
  },
  overrides: [
    {
      files: ['vite.config.ts', 'jest.config.js', 'setupTests.ts', 'cypress.config.ts', 'cypress/support/commands.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
    {
      files: ['**/*.spec.{ts,tsx}'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:jest-dom/recommended'],
      rules: {},
    },
    {
      files: ['**/*.spec.tsx'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
