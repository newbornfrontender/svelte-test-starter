module.exports = ({ production }) => ({
  plugins: {
    htmlnano: production && {},
  },
});
