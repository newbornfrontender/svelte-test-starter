import { createFilter } from 'rollup-pluginutils';
import { writeFileSync } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNormalize from 'postcss-normalize';

import checkDir from './utils/check-dir';
import getFileNameFromId from './utils/get-filename-from-id';

export default (options = {}) => {
  let { include, exclude, ctx } = options;

  if (!include) include = '**/*.css';

  const filter = createFilter(include, exclude);

  checkDir('public');

  return {
    name: 'postcss-in-css',

    async transform(source, id) {
      if (!filter(id)) return;

      const { filename } = getFileNameFromId(id);
      const { plugins, options } = await postcssrc(ctx);
      const {
        css,
        // map,
      } = await postcss([postcssImport(postcssNormalize().postcssImport()), ...plugins]).process(
        source,
        {
          ...options,
          from: id,
          // map: {
          //   inline: false,
          // },
        },
      );

      writeFileSync(`public/${filename}.css`, css, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
