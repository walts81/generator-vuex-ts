'use strict';
const GeneratorBase = require('../add-vuex-type-base');

module.exports = class extends GeneratorBase {
  constructor(args, options) {
    super('mutation', args, options);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    super.writing();
  }
};
