'use strict';
const GeneratorBase = require('../add-vuex-type-base');

module.exports = class extends GeneratorBase {
  constructor(args, options) {
    super('getter', args, options);
  }

  getPrompts() {
    const prompts = super.getPrompts();
    prompts.push({
      type: 'list',
      name: 'getterType',
      message: 'Is this a simple getter or advanced?',
      choices: ['Simple', 'Advanced'],
      default: 'Simple',
    });
  }

  prompting() {
    return super.prompting();
  }

  getTemplateFile() {
    const name = this.props.getterType === 'Advanced' ? 'getter-adv.ts' : 'getter.ts';
    return this.templatePath(name);
  }

  writing() {
    super.writing();
  }
};
