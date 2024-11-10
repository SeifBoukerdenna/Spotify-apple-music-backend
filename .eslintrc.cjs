// .eslintrc.js

module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true, // Enable Jest globals globally (optional)
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest'],
  overrides: [
    {
      files: ['**/__mocks__/**/*.{js,ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        // Add or override rules for mocks if needed
      },
    },
    {
      files: ['**/*.spec.{js,ts,tsx}', '**/*.test.{js,ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        // Add or override rules for test files if needed
      },
    },
  ],
  rules: {
    // Global rules
    'no-undef': 'off', // Optional: Turn off no-undef if unnecessary
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
