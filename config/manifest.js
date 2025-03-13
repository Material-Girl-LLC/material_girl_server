const {
    materialGirlDB
  } = require('../config/db_constants');

let env = 'production';

const envKey = (key) => {

    const configuration = {
      production: {
        host: '127.0.0.1',
        port: 3030,
        prefix: '/server',
        db: materialGirlDB
      }
    };
  
    return configuration[env][key];
  };

const mongodb_URL = 'mongodb://127.0.0.1:27017/materialGirlDB';

const manifest = {
    server: {
      host: '127.0.0.1',
      port: '3030',
      // tls: tlsOptions,
      routes: {
        cors: true
      }
    },
  
    register: {
      plugins: [
        { plugin: 'hapi-auth-jwt2' },
        { plugin: 'hapi-mongodb', options:
          {
            url: mongodb_URL,
            settings: {
              poolSize: 20,
              useNewUrlParser: true,
              useUnifiedTopology: true
            },
            decorate: true
          }
        },
        { plugin: './routes/api/v1/materials', options: {},
          routes: {
            prefix: envKey('prefix') + '/api/v1'
          }
        },
        {
          plugin: './routes/api/v1/login', options: {},
          routes: {
            prefix: envKey('prefix') + '/api/v1'
          }
        }
      ]
    }
  };

  module.exports = manifest;