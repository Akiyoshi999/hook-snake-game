module.exports = {
  root: true,
  extends: [
    // 'plugin:react/recommended',
    'eslint:recommended',
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
}
