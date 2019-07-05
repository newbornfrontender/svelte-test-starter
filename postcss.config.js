module.exports = ({ production }) => ({
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      autoprefixer: production,
    },
  },
});
