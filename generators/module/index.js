'use strict';
const _ = require('underscore.string');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const updateActionTypes = require('./update-action-types');
const updateGetterTypes = require('./update-getter-types');
const updateMutationTypes = require('./update-mutation-types');
const updateModules = require('./update-modules');
const updateRootState = require('./update-root-state');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the jaw-dropping ${chalk.red('generator-vuex:module')} sub-generator!`));

    const prompts = [
      // {
      //   type: 'confirm',
      //   name: 'someAnswer',
      //   message: 'Would you like to enable this option?',
      //   default: true,
      // },
      {
        name: 'moduleName',
        message: 'What is the name of your module?',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.moduleNameCamel = _.camelize(props.moduleName, true);
      props.moduleNameTitle = _.camelize(props.moduleName);
      props.moduleNameSlug = _.slugify(props.moduleName);
      this.props = props;
      this.destinationRoot('src/store/' + props.moduleNameSlug);
    });
  }

  writing() {
    this.conflicter.force = true;
    this.fs.copyTpl(this.templatePath('newModule/'), this.destinationPath(), this.props);
    const temp = this.destinationPath('..');
    updateActionTypes(this.fs, temp, this.props);
    updateGetterTypes(this.fs, temp, this.props);
    updateMutationTypes(this.fs, temp, this.props);
    updateModules(this.fs, temp, this.props);
    updateRootState(this.fs, temp, this.props);
  }
};
