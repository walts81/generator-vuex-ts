'use strict';
const _ = require('underscore.string');
const GeneratorBase = require('../generator-base');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const updateActionTypes = require('./update-action-types');
const updateGetterTypes = require('./update-getter-types');
const updateMutationTypes = require('./update-mutation-types');
const updateModels = require('./update-models');
const updateModules = require('./update-modules');
const updateRootState = require('./update-root-state');

module.exports = class extends GeneratorBase {
  constructor(args, options) {
    super(args, options);
  }

  prompting() {
    this.log(yosay(`Welcome to the jaw-dropping ${chalk.red('generator-vuex:module')} sub-generator!`));

    const prompts = [
      {
        name: 'moduleName',
        message: 'What is the name of your module?',
      },
    ];

    return this.doPrompt(prompts).then(props => {
      props.moduleNameCamel = _.camelize(props.moduleName, true);
      props.moduleNameTitle = _.camelize(props.moduleName);
      props.moduleNameSlug = _.slugify(props.moduleName);
      this.props = props;
      if (this.modules.indexOf(props.moduleNameSlug) > -1) {
        throw new Error('You already have a module with that name');
      }
    });
  }

  writing() {
    this.conflicter.force = true;
    const root = this.props.baseDir;
    const moduleRoot = path.join(root, this.props.moduleNameSlug);
    this.fs.copyTpl(this.templatePath('newModule/'), this.destinationPath(moduleRoot), this.props);
    const temp = this.destinationPath(root);
    updateActionTypes(this.fs, temp, this.props);
    updateGetterTypes(this.fs, temp, this.props);
    updateMutationTypes(this.fs, temp, this.props);
    updateModels(this.fs, temp, this.props);
    updateModules(this.fs, temp, this.props);
    updateRootState(this.fs, temp, this.props);
    this.addModuleToConfig(this.props.moduleNameSlug);
  }
};
