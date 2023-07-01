'use strict';

const Hapi = require('hapi');

// const myPlugin = require('./plugins/myPlugin');
// const db = require('./plugins/db_materials');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // await server.register(myPlugin);

    await server.register({
        plugin: require('hapi-mongodb'),
        options: {
          url: 'mongodb://localhost:27017/sealogDB',
          settings : {
          }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();