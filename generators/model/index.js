const path = require('path');
const GeneratorBase = require('../add-vuex-type-base');

module.exports = class extends GeneratorBase {
  constructor(args, options) {
    super('model', args, options);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.conflicter.force = true;
    const props = this.props;
    const root = path.join(props.baseDir, props.moduleNameSlug, 'models');
    this.fs.copyTpl(
      this.templatePath(`${this.type}.ts`),
      this.destinationPath(path.join(root, `${props.nameSlug}.ts`)),
      props
    );
    const temp = this.destinationPath(path.join(root, 'index.ts'));
    this.fs.copy(temp, temp, {
      process: function(content) {
        const str = content.toString();
        const text = `export * from './${props.nameSlug}';`;
        if (str.indexOf('export default') > -1) {
          return `${text}\n`;
        } else {
          const ix = str.lastIndexOf(';') + 1;
          return str.substring(0, ix) + `\n${text}` + str.substr(ix);
        }
      },
    });
  }
};
