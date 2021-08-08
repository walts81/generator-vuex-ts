const update = require('./update-types-base');

module.exports = (fs, destinationPath, props) => {
  return update(fs, destinationPath, props, 'action');
};
