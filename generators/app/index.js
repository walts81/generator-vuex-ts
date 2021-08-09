'use strict';
const GeneratorBase = require('../generator-base');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends GeneratorBase {
  constructor(args, options) {
    super(args, options);
  }

  prompting() {
    this.log(yosay(`Welcome to the awe-inspiring ${chalk.red('generator-vuex')} generator!`));

    return this.doPrompt([]).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('store/'), this.destinationPath(this.props.baseDir));
  }
};
