module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    // 'import/extensions': [
    //     2,
    //     'ignorePackages',
    //     {
    //       js: 'never',
    //       jsx: 'never',
    //       ts: 'never',
    //       tsx: 'never',
    //     },
    //   ],
    'prettier/prettier': 'error',
  },
};
