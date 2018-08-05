module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    jest: true
  },
  rules: {
    quotes: [2, 'single'],
  }
};
