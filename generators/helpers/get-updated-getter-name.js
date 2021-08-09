const _ = require('underscore.string');

module.exports = {
  getNameCamel: name => {
    const temp = _.underscored(name);
    if (temp.startsWith('get_')) {
      return _.decapitalize(name.substr(3));
    }
    return name;
  },
  getNameSnake: name => {
    if (name.startsWith('get_')) {
      return name.substr(4);
    }
    return name;
  },
};
