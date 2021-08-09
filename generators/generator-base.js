const Generator = require('yeoman-generator');
const path = require('path');
const dirInquirerPlugin = require('inquirer-directory');
const directoryPropType = 'directory';
const baseDirPropName = 'baseDir';
const modulePropName = 'modules';

const getUpdatedPrompts = (prompts, baseDir) => {
  const p = !!prompts ? [...prompts] : [];
  const message =
    p.length === 0
      ? `Where would you like your Vuex store directory to be located?`
      : `Where is your Vuex store located?`;
  const newPrompt = {
    type: directoryPropType,
    name: baseDirPropName,
    message,
    basePath: '.',
  };

  if (!baseDir) {
    p.unshift(newPrompt);
  }
  return p;
};

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.env.adapter.promptModule.registerPrompt(directoryPropType, dirInquirerPlugin);
    let modules = this.config.get(modulePropName);
    if (!modules) {
      modules = ['app'];
      this.config.set(modulePropName, modules);
    }
    modules.sort();
    this.modules = modules;
  }

  doPrompt(prompts) {
    let baseDir = this.config.get(baseDirPropName);
    const updatedPrompts = getUpdatedPrompts(prompts, baseDir);
    return this.prompt(updatedPrompts).then(props => {
      if (!baseDir) baseDir = props[baseDirPropName];

      const storeDirNames = ['store', 'vuex', 'vuex-store'];
      if (storeDirNames.every(x => !baseDir.endsWith(x) && !baseDir.endsWith(x + '/'))) {
        baseDir = path.join(baseDir, 'store');
      }
      props[baseDirPropName] = baseDir;
      this.config.set(baseDirPropName, baseDir);
      return props;
    });
  }

  addModuleToConfig(name) {
    const modules = [...this.modules];
    modules.push(name);
    modules.sort();
    this.config.set(modulePropName, modules);
    this.modules = modules;
  }
};
