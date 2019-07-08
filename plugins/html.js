import { createFilter } from 'rollup-pluginutils';
import { writeFileSync } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import syntax from 'postcss-syntax';
import htmlnano from 'htmlnano';

const production = !process.env.ROLLUP_WATCH;

const getFilePath = (id) => {
  const name = id
    .split('\\')
    .pop()
    .split('.')
    .shift();

  const path = `${__dirname}\\public\\${name}.html`;

  return { path };
};

const transform = async (code, from, to) => {
  const { plugins, options } = await postcssrc({ production });
  const { css } = await postcss(plugins).process(code, { ...options, from, to, syntax: syntax });

  return { css };
};

const minify = async (code) => {
  const { html } = await htmlnano.process(code);

  return { html };
};

export default (options = {}) => {
  if (!options.include) options.include = '**/*.html';

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'rollup-plugin-posthtml',

    async transform(source, id) {
      if (!filter(id)) return;

      const { path } = getFilePath(id);
      const { css: code } = await transform(source, id, path);
      const { html } = await minify(code);

      writeFileSync(path, html, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
