module.exports = {
  '*.{js}': ['eslint --cache --fix'],
  '*.{ts,tsx}': [
    () => 'tsc --skipLibCheck --noEmit  --project ./tsconfig.json',
    'eslint --cache --fix',
  ],
};
