module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-var": "error",
    "semi": "error",
    "eqeqeq": "error",
    "indent": ["error", 2],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "no-use-before-define": "off",
    /*"linebreak-style": ["error", "windows"],*/
    "key-spacing": ["error", { "mode": "minimum" }],
    "no-trailing-spaces": "error",
    "jsx-a11y/alt-text": [0], // alt="" kontroll
    "@typescript-eslint/no-explicit-any": ["off"],
    "max-len": ["error", { "code": 120, "ignoreUrls": true, "ignoreStrings": true }],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
  },
}
