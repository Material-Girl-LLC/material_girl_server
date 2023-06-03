'use strict';

exports.plugin = {
    name: 'myPlugin',
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example

        server.route({
            method: 'GET',
            path: '/myPlugin',
            handler: function (request, h) {

                return "this is my test plugin!";
            }
        });

        // etc ...
        // await someAsyncMethods();
    }
};