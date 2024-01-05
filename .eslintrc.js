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
    project: ['./tsconfig.json', './apps/frontend-e2e/tsconfig.json', './apps/backend/tsconfig.json'],
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'arrow-body-style': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/extensions': 'off', // handled by TS
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
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'object'],
      },
    ],
    '@typescript-eslint/return-await': ['error', 'always'],
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNullish: true }],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array-simple' }],
    '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
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
      files: [
        'tests',
        'vite.config.?(c|m)ts',
        'apps/*/cypress.config.{ts,mjs}',
        'apps/*/cypress/support/commands.ts',
        'apps/*/tests/**',
        'apps/*/vitest.config.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
    {
      files: ['**/*.spec.{ts,tsx}'],
      extends: ['plugin:vitest/recommended', 'plugin:jest-dom/recommended'],
      rules: {
        'no-restricted-globals': [
          'error',
          {
            name: 'jest',
            message: 'Import it instead.',
          },
          {
            name: 'beforeEach',
            message: 'Import it instead.',
          },
          {
            name: 'beforeAll',
            message: 'Import it instead.',
          },
          {
            name: 'afterEach',
            message: 'Import it instead.',
          },
          {
            name: 'afterAll',
            message: 'Import it instead.',
          },
          {
            name: 'it',
            message: 'Import it instead.',
          },
          {
            name: 'test',
            message: 'Import it instead.',
          },
          {
            name: 'describe',
            message: 'Import it instead.',
          },
          {
            name: 'expect',
            message: 'Import it instead.',
          },
        ],
      },
    },
    {
      files: ['**/*.spec.tsx'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
