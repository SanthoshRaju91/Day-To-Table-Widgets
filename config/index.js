/**
* Node config file, the sole purpose to determine the environment of the application.
*/

module.exports = (function(env) {
  var config = {};

  switch(env) {
    case 'production' :
        config = require('../env/production');
        break;

    case 'development':
        config = require('../env/development');
        break;

    default:
        process.exit(1);
    }
  return config;
}(process.env.NODE_ENV || 'development'));
