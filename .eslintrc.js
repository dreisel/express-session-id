module.exports = {
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
