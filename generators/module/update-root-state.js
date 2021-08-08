const path = require('path');
const updateHelpers = require('../update-helpers');

module.exports = (fs, destinationPath, props) => {
  const temp = path.join(destinationPath, `root-state.ts`);
  fs.copy(temp, temp, {
    process: function(content) {
      const str = content.toString();

      let updated = updateHelpers.update(
        str,
        '',
        0,
        'export interface RootState',
        `/state';`,
        () =>
          `\nimport { ${props.moduleNameTitle}State, getDefault${props.moduleNameTitle}State } from './${props.moduleNameSlug}/state';`
      );

      updated = updateHelpers.update(
        str,
        updated.content,
        updated.index,
        'export const getDefaultRootState',
        'State;',
        () => `\n  ${props.moduleNameCamel}: ${props.moduleNameTitle}State;`
      );
      updated = updateHelpers.update(
        str,
        updated.content,
        updated.index,
        '});',
        'State(),',
        () => `\n  ${props.moduleNameCamel}: getDefault${props.moduleNameTitle}State(),`
      );

      return updated.content + str.substr(updated.index);
    },
  });
};
