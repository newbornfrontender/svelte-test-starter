import { createFilter } from 'rollup-pluginutils';
import { writeFile } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import cssnano from 'cssnano';

export default (options = {}) => {
  let { include, exclude, ctx, config } = options;

  if (!include) include = '**/*.css';

  const filter = createFilter(include, exclude);

  return {
    name: 'rollup-plugin-postcss',

    async transform(source, id) {
      if (!filter(id)) return;

      const { plugins, options } = await postcssrc(ctx);

      ctx.production && plugins.push(cssnano(config));

      const { css } = await postcss(plugins).process(source, {
        ...options,
        from: id,
        to: 'public/global.css',
      });

      writeFile('public/global.css', css, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
