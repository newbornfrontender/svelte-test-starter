import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import { sync as rimraf } from 'rimraf';

import posthtml from './plugins/html';

const production = !process.env.ROLLUP_WATCH;

rimraf('public/**/*');

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'esm',
    dir: 'public',
    preferConst: true,
  },
  plugins: [
    posthtml(),
    svelte({
      dev: !production,
      emitCss: true,
      preprocess: autoPreprocess({
        postcss: {
          production,
        },
      }),
    }),
    resolve({
      browser: true,
      modulesOnly: true,
    }),
    babel(),
    postcss({
      extract: true,
      sourceMap: true,
      minimize: production,
      config: {
        ctx: {
          production,
        },
      },
    }),
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
