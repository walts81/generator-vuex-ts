const path = require('path');
const updateHelpers = require('./update-helpers');

module.exports = (fs, destinationPath, props, type) => {
  const temp = path.join(destinationPath, `_${type}s.ts`);
  fs.copy(temp, temp, {
    process: function(content) {
      const str = content.toString();
      let updated = updateHelpers.update(
        str,
        '',
        0,
        `export const ${type}s =`,
        `';`,
        () => `\nimport ${props.nameCamel} from './${props.nameSlug}';`
      );

      const text = `\n  [${type}Types.${props.nameCamel}]: ${props.nameCamel},`;

      let updated2 = updateHelpers.update(str, updated.content, updated.index, '', '{};', () => `${text}\n`, 1);

      updated =
        updated2.index === -1
          ? updateHelpers.update(str, updated.content, updated.index, '', ',', () => text)
          : updated2;

      return updated.content + str.substr(updated.index);
    },
  });
};
