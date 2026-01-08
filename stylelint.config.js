/** @type {import("stylelint").Config} */
export default {
  ignoreFiles: ['**/dist/**', '**/node_modules/**'],
  extends: ['stylelint-config-standard', 'stylelint-config-idiomatic-order'],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
};
