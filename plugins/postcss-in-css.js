import { createFilter } from 'rollup-pluginutils';
import { writeFileSync } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import cssnano from 'cssnano';

export default (options = {}) => {
  let { include, exclude, production, minify } = options;

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

      production && plugins.push(cssnano(minify));

      const { css, map } = await postcss(plugins).process(source, {
        ...options,
        from: id,
        to: path,
        map: {
          inline: false,
        },
      });

      console.log(map);

      writeFileSync(path, css, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
