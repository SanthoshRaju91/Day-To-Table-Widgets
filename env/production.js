/**
* Development environment configuration
*/

module.exports = {
  config: {
    host: '0.0.0.0',
    port: '8000',
    database: 'dev',
    user: 'user',
    password: 'user',
    charset: 'utf8'
  },
  loggerFileLocation: 'logs/app.log',
  mongodb: {
    url: 'mongodb://0.0.0.0:27017/test'
  }
};
