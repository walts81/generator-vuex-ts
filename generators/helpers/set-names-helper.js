const _ = require('underscore.string');

module.exports = (props, name) => {
  props[name + 'Camel'] = _.camelize(props[name], true);
  props[name + 'Title'] = _.capitalize(_.camelize(props[name]));
  props[name + 'Slug'] = _.slugify(props[name]);
  props[name + 'Snake'] = _.underscored(props[name]);
};
