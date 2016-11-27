/**
* Development environment configuration
*/

module.exports = {
  config: {
    host: '127.0.0.1',
    port: '8080',
    database: 'dev',
    user: 'user',
    password: 'user',
    charset: 'utf8'
  },    
  loggerFileLocation: 'logs/app.log',
  mongodb: {
    url: 'mongodb://localhost:27017/daytotable'
  }
};
