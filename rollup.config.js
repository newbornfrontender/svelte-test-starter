import { existsSync, mkdirSync } from 'fs';
import { sync as rimraf } from 'rimraf';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import postcssPresetEnv from 'postcss-preset-env';

// External rollup plugins
import resolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';

// Local rollup plugins
import html from './plugins/html';
import css from './plugins/css';

const production = !process.env.ROLLUP_WATCH;

!existsSync('public') ? mkdirSync('public') : rimraf('public/**/*');

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
    svelte({
      dev: !production,
      exclude: '**/*.html',
      preprocess: {
        async style({ content, filename }) {
          const { css } = await postcss([
            postcssPresetEnv({
              stage: 4,
              features: {
                'nesting-rules': true,
              },
              autoprefixer: false,
            }),
          ]).process(content, { from: filename });

          return {
            code: css,
          };
        },
      },
      async css(source) {
        const { code } = source;
        const { plugins, options } = await postcssrc({ production });
        const { css } = await postcss(plugins).process(code, { ...options, from: undefined });

        source.code = css;
        source.write('public/bundle.css');
      },
    }),
    html({
      ctx: {
        production,
      },
    }),
    css({
      ctx: {
        production,
      },
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
