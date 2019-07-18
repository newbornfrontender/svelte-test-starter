const { browserslist: browsers } = require('./package.json');

module.exports = ({ production }) => ({
  plugins: {
    'postcss-use': true,
    'postcss-import': true,
    'postcss-normalize': true,
    'postcss-preset-env': {
      stage: 0,
      autoprefixer: production,
    },
    doiuse: {
      browsers,
      ignoreFiles: ['**/normalize.css'],
    },
    'postcss-reporter': true,
  },
});
