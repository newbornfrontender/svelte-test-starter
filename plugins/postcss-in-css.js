import { createFilter } from 'rollup-pluginutils';
import { writeFileSync } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNormalize from 'postcss-normalize';

export default (options = {}) => {
  let { include, exclude, production } = options;

  if (!include) include = '**/*.css';

  const filter = createFilter(include, exclude);

  return {
    name: 'rollup-plugin-postcss',

    async transform(source, id) {
      if (!filter(id)) return;

      const name = id
        .split('\\')
        .pop()
        .split('.')
        .shift();
      const path = `${__dirname}\\public\\${name}.css`;

      const { plugins, options } = await postcssrc({ production });

      const {
        css,
        // map,
      } = await postcss([postcssImport(postcssNormalize().postcssImport()), ...plugins]).process(
        source,
        {
          ...options,
          from: id,
          to: path,
          // map: {
          //   inline: false,
          // },
        },
      );

      writeFileSync(path, css, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
