module.exports = {
  extends: ['htmlacademy/es6'],
  rules: {
    'no-console': 0,
    'comma-dangle': ['error', {
      'arrays': 'never',
      'objects': 'always-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }],
    'quotes': ['error', 'single'],
  },
};
