import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import babel from 'rollup-plugin-babel';
import alias from 'rollup-plugin-alias';
import { sync as rimraf } from 'rimraf';

import postCssInHtml from './plugins/postcss-in-html';
import postCssInCss from './plugins/postcss-in-css';

const production = !process.env.ROLLUP_WATCH;

rimraf('public/**/*');

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    file: 'public/bundle.js',
    preferConst: true,
  },
  plugins: [
    resolve({
      browser: true,
      modulesOnly: true,
    }),
    alias({
      resolve: ['.svelte', '.js'],
      component: `${__dirname}/src/components`,
      store: `${__dirname}/src/store`,
    }),
    postCssInHtml({
      production,
    }),
    postCssInCss({
      production,
    }),
    svelte({
      dev: !production,
      css: (css) => css.write('public/bundle.css'),
      preprocess: autoPreprocess({
        postcss: {
          production,
        },
      }),
    }),
    babel(),
    !production && livereload('public'),
    production &&
      terser({
        module: true,
        mangle: {
          module: true,
        },
      }),
  ],
  watch: {
    clearScreen: false,
  },
  treeshake: production,
};
