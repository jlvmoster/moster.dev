const path = require('path');

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,ts,jsx,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.{html,css,json,yml,yaml,md,mdx}': ['prettier --write'],
};
