export default {
  '**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --cache --fix --quiet'],
  '**/*.{css,scss,json,md}': ['prettier --write']
}
