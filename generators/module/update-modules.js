const path = require('path');

module.exports = (fs, destinationPath, props) => {
  const temp = path.join(destinationPath, `modules.ts`);
  fs.copy(temp, temp, {
    process: function(content) {
      const str = content.toString();
      const ix1 = str.lastIndexOf(`/module';`) + 9;
      let result =
        str.substr(0, ix1) + `\nimport { ${props.moduleNameCamel} } from './${props.moduleNameSlug}/module';`;
      const ix2 = str.lastIndexOf(',') + 1;
      result += str.substr(ix1, ix2 - ix1);
      result += `\n  ${props.moduleNameCamel},` + str.substr(ix2);
      return result;
    },
  });
};
