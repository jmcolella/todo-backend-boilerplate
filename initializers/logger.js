const morgan = require('morgan');

module.exports = {
  name: 'logger',
  configure: (app) => app.use(morgan('dev')),
};
