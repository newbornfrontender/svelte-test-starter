import { createFilter } from 'rollup-pluginutils';
import { writeFileSync } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import syntax from 'postcss-syntax';
import htmlnano from 'htmlnano';

import checkDir from './utils/check-dir';
import getFileName from './utils/get-filename';

export default (options = {}) => {
  let { include, exclude, ctx } = options;

  if (!include) include = '**/*.html';

  const filter = createFilter(include, exclude);

  checkDir('public');

  return {
    name: 'postcss-in-html',

    async transform(source, id) {
      if (!filter(id)) return;

      const { plugins, options } = await postcssrc(ctx);
      const { css } = await postcss(plugins).process(source, {
        ...options,
        syntax: syntax,
        from: id,
      });
      const { html } = await htmlnano.process(css, options);

      writeFileSync(`public/${getFileName(id)}.html`, ctx.production ? html : css, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
