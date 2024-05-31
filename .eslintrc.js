module.exports = {
    root: true,
    env: {
      node: true,
      es2021: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
     // Enforce the use of semicolons
    'semi': ['error', 'always'],

    // Enforce single quotes for string literals
    'quotes': ['error', 'single'],

    // Enforce consistent indentation (2 spaces)
    'indent': ['error', 2],

    // Enforce trailing commas in multiline object and array literals
    'comma-dangle': ['error', 'always-multiline'],

    // Disallow unused variables
    'no-unused-vars': 'error',

    // Enforce consistent spacing after keywords (e.g., if, else, for)
    'keyword-spacing': ['error', { 'after': true }],

    // Disallow unnecessary escape characters
    'no-useless-escape': 'error',

    // Enforce consistent linebreak style (LF for Unix-like systems)
    'linebreak-style': ['error', 'unix'],

    // Enforce consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'always'],

    // Enforce consistent spacing inside object literals
    'object-curly-spacing': ['error', 'always'],

    // Disallow multiple empty lines
    'no-multiple-empty-lines': ['error', { 'max': 1 }],

    // Enforce consistent function naming convention
    'func-name-matching': ['error', 'always', { 'includeCommonJSModuleExports': false }],
    },
  };