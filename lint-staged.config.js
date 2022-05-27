module.exports = {
  '*.{js}': ['eslint --cache --fix'],
  '*.{ts}': [() => 'tsc --skipLibCheck --noEmit', 'eslint --cache --fix'],
};
