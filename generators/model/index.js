const BaseGenerator = require('../add-helper');

module.exports = class extends BaseGenerator {
  constructor(args, options) {
    super('model', args, options);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.conflicter.force = true;
    const props = this.props;
    this.fs.copyTpl(this.templatePath(`${this.type}.ts`), this.destinationPath(`${props.nameSlug}.ts`), props);
    const temp = this.destinationPath('index.ts');
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
