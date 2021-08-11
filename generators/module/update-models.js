const path = require('path');

module.exports = (fs, destinationPath, props) => {
  const temp = path.join(destinationPath, `models.ts`);
  fs.copy(temp, temp, {
    process: function(content) {
      const str = content.toString();
      const ix1 = str.lastIndexOf(`_models';`) + 9;
      return str.substr(0, ix1) + `\nexport * from './${props.moduleNameSlug}/models/_models';` + str.substr(ix1);
    },
  });
};
