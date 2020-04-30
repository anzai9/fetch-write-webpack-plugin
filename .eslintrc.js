module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: [
    "import",
    "prettier",
    "standard"
  ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  env: {
    node: true,
    es6: true,
    jest: true
  }
}
