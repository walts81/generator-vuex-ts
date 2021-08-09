const path = require('path');
const nameHelpers = require('../get-updated-getter-name');

module.exports = (fs, destinationPath, props, type) => {
  const temp = path.join(destinationPath, `_types.ts`);
  fs.copy(temp, temp, {
    process: function(content) {
      const str = content.toString();
      let ix1 = str.lastIndexOf('{};');
      const isFirst = ix1 > -1;
      if (isFirst) {
        ix1++;
      } else {
        ix1 = str.lastIndexOf('`,') + 2;
      }
      let propName = props.nameCamel;
      let propValue = props.nameSnake;
      if (type === 'getter') {
        propName = nameHelpers.getNameCamel(propName);
        propValue = nameHelpers.getNameSnake(propValue);
      }
      let result = str.substring(0, ix1) + `\n  ${propName}: \`$\{prefix}${propValue}\`,`;
      if (isFirst) result += '\n';
      result += str.substr(ix1);
      return result;
    },
  });
};
