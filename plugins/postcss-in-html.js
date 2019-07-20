import { createFilter } from 'rollup-pluginutils';
import { writeFileSync } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import syntax from 'postcss-syntax';
import htmlnano from 'htmlnano';

export default (options = {}) => {
  let { include, exclude, production } = options;

  if (!include) include = '**/*.html';

  const filter = createFilter(include, exclude);

  return {
    name: 'rollup-plugin-postcss-in-html',

    async transform(source, id) {
      if (!filter(id)) return;

      const name = id
        .split('\\')
        .pop()
        .split('.')
        .shift();
      const path = `${__dirname}\\public\\${name}.html`;

      const { plugins, options } = await postcssrc({ production });
      const { css } = await postcss(plugins).process(source, {
        ...options,
        syntax: syntax,
        from: id,
      });
      const { html } = await htmlnano.process(css, options);

      writeFileSync(path, production ? html : css, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
