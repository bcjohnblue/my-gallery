const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  // ignorePatterns: ['.eslintrc.js', 'craco.config.js', 'src/**/*.d.ts'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 80,
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        arrowParens: 'always',
      },
    ],
    'import/no-absolute-path': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/prop-types': OFF,
    'react/destructuring-assignment': OFF,
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    'react/no-array-index-key': WARN,
    'consistent-return': OFF,
    'no-unused-expressions': OFF,
    '@typescript-eslint/no-unused-expressions': OFF,
  },
};
