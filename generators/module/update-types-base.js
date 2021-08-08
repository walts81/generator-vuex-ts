const path = require('path');

module.exports = (fs, destinationPath, props, type) => {
  const temp = path.join(destinationPath, `${type}-types.ts`);
  fs.copy(temp, temp, {
    process: function(content) {
      const str = content.toString();
      const ix1 = str.lastIndexOf(`_types';`) + 8;
      let result =
        str.substr(0, ix1) +
        `\nimport { ${type}Types as ${props.moduleNameCamel} } from './${props.moduleNameSlug}/${type}s/_types';`;
      const ix2 = str.lastIndexOf(',') + 1;
      result += str.substr(ix1, ix2 - ix1);
      result += `\n  ${props.moduleNameCamel},` + str.substr(ix2);
      return result;
    },
  });
};
