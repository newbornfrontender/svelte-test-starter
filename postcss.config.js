const { browserslist: browsers } = require('./package.json');

module.exports = ({ production }) => ({
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      autoprefixer: production,
    },
    doiuse: {
      browsers,
    },
    'postcss-reporter': true,
  },
});
