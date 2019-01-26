module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  env: {
    jest: true
  },
  rules: {
    quotes: [2, 'single'],
  }
};
