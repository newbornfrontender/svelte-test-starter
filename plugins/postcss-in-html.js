import { createFilter } from 'rollup-pluginutils';
import { writeFileSync } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import syntax from 'postcss-syntax';
import htmlnano from 'htmlnano';

import checkDir from './utils/check-dir';
import getFileNameFromId from './utils/get-filename-from-id';

checkDir('public');

export default (options = {}) => {
  let { include, exclude, ctx } = options;

  if (!include) include = '**/*.html';

  const filter = createFilter(include, exclude);

  return {
    name: 'postcss-in-html',

    async transform(source, id) {
      if (!filter(id)) return;

      const { filename } = getFileNameFromId(id);
      const { plugins, options } = await postcssrc(ctx);
      const { css } = await postcss(plugins).process(source, {
        ...options,
        syntax: syntax,
        from: id,
      });
      const { html } = await htmlnano.process(css, options);

      writeFileSync(`public/${filename}.html`, ctx.production ? html : css, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
