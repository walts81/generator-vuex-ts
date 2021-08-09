const path = require('path');

module.exports = (fs, destinationPath, props) => {
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
      let result = str.substring(0, ix1) + `\n  ${props.nameCamel}: \`$\{prefix}${props.nameSnake}\`,`;
      if (isFirst) result += '\n';
      result += str.substr(ix1);
      return result;
    },
  });
};
