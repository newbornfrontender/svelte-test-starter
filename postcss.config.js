module.exports = ({ production }) => ({
  plugins: {
    'postcss-use': true,
    'postcss-import': true,
    'postcss-normalize': true,
    'postcss-preset-env': {
      stage: 0,
      autoprefixer: production,
    },
  },
});
