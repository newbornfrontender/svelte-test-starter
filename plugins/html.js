// import { createFilter } from 'rollup-pluginutils';
// import { writeFile } from 'fs';
// import postcssrc from 'postcss-load-config';
// import postcss from 'postcss';
// import syntax from 'postcss-syntax';
// import posthtml from 'posthtml';

// const getFilePath = (id) => {
//   const name = id
//     .split('\\')
//     .pop()
//     .split('.')
//     .shift();

//   const path = `${__dirname}\\public\\${name}.html`;

//   return { path };
// };

// export default ({ options = {}, { production } = {}, config = {} }) => {
//   if (!options.include) options.include = '**/*.html';

//   const filter = createFilter(options.include, options.exclude);

//   const transformPostCSS = async (code, from, to) => {
//     const { plugins, options } = await postcssrc({ production });
//     const { css } = await postcss(plugins).process(code, { ...options, from, to, syntax: syntax });

//     return { css };
//   };

//   const transformPostHTML = async (code) => {
//     config = config.plugins;

//     const load = (plugin, options) => {
//       if (options === null || Object.keys(options).length === 0) {
//         try {
//           return require(plugin);
//         } catch (err) {
//           console.log(err);
//         }
//       } else {
//         try {
//           return require(plugin)(options);
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     };

//     let plugins = [];

//     Object.keys(config)
//       .filter((plugin) => (config[plugin] !== false ? plugin : ''))
//       .forEach((plugin) => {
//         plugin = load(plugin, config[plugin]);

//         if (plugin.default) {
//           plugin = plugin.default;
//         }

//         return plugins.push(plugin);
//       });

//     const { html } = await posthtml(plugins).process(code);

//     return { html };
//   };

//   return {
//     name: 'rollup-plugin-posthtml',

//     async transform(source, id) {
//       if (!filter(id)) return;

//       const { path } = getFilePath(id);
//       const { css } = await transformPostCSS(source, id, path);
//       const { html } = await transformPostHTML(css);

//       writeFile(path, html, () => true);

//       return {
//         code: '',
//         map: null,
//       };
//     },
//   };
// };

// =================================================================================================

// import { createFilter } from 'rollup-pluginutils';
// import { writeFile } from 'fs';
// import postcssrc from 'postcss-load-config';
// import postcss from 'postcss';
// import syntax from 'postcss-syntax';
// import posthtml from 'posthtml';
// import htmlnano from 'htmlnano';

// const production = !process.env.ROLLUP_WATCH;

// const getFilePath = (id) => {
//   const name = id
//     .split('\\')
//     .pop()
//     .split('.')
//     .shift();
//   const path = `${__dirname}\\public\\${name}.html`;

//   return { path };
// };

// export default (options = {}) => {
//   if (!options.include) options.include = '**/*.html';

//   const filter = createFilter(options.include, options.exclude);

//   const transformPostCSS = async (code, from = undefined, to = undefined) => {
//     const { plugins, options } = await postcssrc({ production });
//     const { css } = await postcss(plugins).process(code, { ...options, from, to, syntax: syntax });

//     return { css };
//   };

//   const transformPostHTML = async (code) => {
//     let plugins = [
//       !production && htmlnano(),
//     ].filter((_) => !!_);

//     const { html } = await posthtml(plugins).process(code);

//     return { html };
//   };

//   return {
//     name: 'rollup-plugin-posthtml',

//     async transform(source, id) {
//       if (!filter(id)) return;

//       const { path } = getFilePath(id);
//       const { css } = await transformPostCSS(source, id, path);
//       const { html } = await transformPostHTML(css);

//       writeFile(path, html, () => true);

//       return {
//         code: '',
//         map: null,
//       };
//     },
//   };
// };

// =============================================================================

import { createFilter } from 'rollup-pluginutils';
import { writeFile } from 'fs';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import syntax from 'postcss-syntax';
import posthtml from 'posthtml';
import posthtmlrc from 'posthtml-load-config';

const production = !process.env.ROLLUP_WATCH;

export default (options = {}) => {
  if (!options.include) options.include = '**/*.html';

  const filter = createFilter(options.include, options.exclude);

  const getFilePath = (id) => {
    const name = id
      .split('\\')
      .pop()
      .split('.')
      .shift();
    const path = `${__dirname}\\public\\${name}.html`;

    return { path };
  };

  const transformPostCSS = async (code, from, to) => {
    const { plugins, options } = await postcssrc({ production });
    const { css } = await postcss(plugins).process(code, { ...options, from, to, syntax: syntax });

    return { css };
  };

  const transformPostHTML = async (code, from, to) => {
    const { plugins, options } = await posthtmlrc({ production });
    const { html } = await posthtml(plugins).process(code, { ...options, from, to });

    return { html };
  };

  return {
    name: 'rollup-plugin-posthtml',

    async transform(source, id) {
      if (!filter(id)) return;

      const { path } = getFilePath(id);
      const { css } = await transformPostCSS(source, id, path);
      const { html } = await transformPostHTML(css, id, path);

      writeFile(path, html, () => true);

      return {
        code: '',
        map: null,
      };
    },
  };
};
