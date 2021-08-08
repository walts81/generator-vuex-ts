'use strict';
const BaseGenerator = require('../add-helper');

module.exports = class extends BaseGenerator {
  constructor(args, options) {
    super('action', args, options);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    super.writing();
  }
};
