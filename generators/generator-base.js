const Generator = require('yeoman-generator');
const path = require('path');
const dirInquirerPlugin = require('inquirer-directory');
const directoryPropType = 'directory';
const baseDirPropName = 'baseDir';
const modulePropName = 'modules';
const versionPropName = 'vuexVersion';

const getUpdatedPrompts = (prompts, version, baseDir, isAppGen) => {
  const p = !!prompts ? [...prompts] : [];
  const message = isAppGen
    ? `Where would you like your Vuex store directory to be located?`
    : `Where is your Vuex store located?`;
  const locationPrompt = {
    type: directoryPropType,
    name: baseDirPropName,
    message,
    basePath: '.',
  };

  if (!baseDir) {
    p.unshift(locationPrompt);
  }

  if (isAppGen && !version) {
    p.unshift({
      type: 'list',
      name: versionPropName,
      message: 'What version of Vuex are you using?',
      choices: ['3', '4'],
      default: '4',
    });
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

  doPrompt(prompts, isAppGen) {
    let baseDir = this.config.get(baseDirPropName);
    let version = this.config.get(versionPropName);
    const updatedPrompts = getUpdatedPrompts(prompts, version, baseDir, isAppGen);
    return this.prompt(updatedPrompts).then(props => {
      if (!baseDir) baseDir = props[baseDirPropName];
      if (!version) version = props[versionPropName];

      const storeDirNames = ['store', 'vuex', 'vuex-store'];
      if (storeDirNames.every(x => !baseDir.endsWith(x) && !baseDir.endsWith(x + '/'))) {
        baseDir = path.join(baseDir, 'store');
      }
      props[baseDirPropName] = baseDir;
      props[versionPropName] = version;
      this.config.set(baseDirPropName, baseDir);
      this.config.set(versionPropName, version);
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
