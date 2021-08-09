'use strict';
const GeneratorBase = require('./generator-base');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const setNames = require('./helpers/set-names-helper');
const updateTypes = require('./helpers/file-writer-helpers/update-types-helper');
const updateImpl = require('./helpers/file-writer-helpers/update-impl-helper');

module.exports = class extends GeneratorBase {
  constructor(type, args, options) {
    super(args, options);

    this.type = type;
  }

  prompting() {
    this.log(yosay(`Welcome to the most-excellent ${chalk.red(`generator-vuex:add-${this.type}`)} sub-generator!`));

    const prompts = [
      {
        type: 'list',
        name: 'moduleName',
        message: `Which Vuex module would you like to add this ${this.type} to?`,
        choices: this.modules,
        default: this.modules[0],
      },
      {
        type: 'input',
        name: 'name',
        message: `What is the name of your ${this.type}?`,
      },
    ];
    if (this.type === 'action' || this.type === 'mutation') {
      prompts.push({
        type: 'list',
        name: 'dataType',
        message: 'What data type should be used for payload?',
        choices: ['string', 'boolean', 'number', 'any'],
      });
    }

    return this.doPrompt(prompts).then(props => {
      setNames(props, 'moduleName');
      setNames(props, 'name');
      this.props = props;
    });
  }

  writing() {
    this.conflicter.force = true;
    const root = path.join(this.props.baseDir, `${this.props.moduleNameSlug}/${this.type}s/`);
    this.fs.copyTpl(
      this.templatePath(`${this.type}.ts`),
      this.destinationPath(path.join(root, `${this.props.nameSlug}.ts`)),
      this.props
    );
    updateTypes(this.fs, this.destinationPath(root), this.props);
    updateImpl(this.fs, this.destinationPath(root), this.props, this.type);
  }
};
