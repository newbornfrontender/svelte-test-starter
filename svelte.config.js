const autoPreprocess = require('svelte-preprocess');

module.exports = {
  // emitCss: true,
  preprocess: autoPreprocess({
    postcss: true,
  }),
};
