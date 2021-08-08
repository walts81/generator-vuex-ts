'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const setNames = require('./set-names-helper');
const updateTypes = require('./update-types-helper');
const updateImpl = require('./update-impl-helper');

module.exports = class extends Generator {
  constructor(type, args, options) {
    super(args, options);

    this.type = type;
    this.env.adapter.promptModule.registerPrompt('directory', require('inquirer-directory'));
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the most-excellent ${chalk.red(`generator-vuex:add-${this.type}`)} sub-generator!`));

    const prompts = [
      {
        type: 'directory',
        name: 'moduleName',
        message: `Which Vuex module would you like to add this ${this.type} to?`,
        basePath: './src/store',
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

    return this.prompt(prompts).then(props => {
      setNames(props, 'moduleName');
      setNames(props, 'name');
      this.destinationRoot(`src/store/${props.moduleNameSlug}/${this.type}s/`);
      this.props = props;
    });
  }

  writing() {
    this.conflicter.force = true;
    this.fs.copyTpl(
      this.templatePath(`${this.type}.ts`),
      this.destinationPath(`${this.props.nameSlug}.ts`),
      this.props
    );
    updateTypes(this.fs, this.destinationPath(), this.props);
    updateImpl(this.fs, this.destinationPath(), this.props, this.type);
  }
};
