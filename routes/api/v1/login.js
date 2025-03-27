'use strict';

const pluginName = 'login';

exports.plugin = {
    name: pluginName,
    version: '1.0.0',
    register: async function (server, options) {

        server.route({
            method: 'GET',
            path: '/' + pluginName,
            handler: async function (request, h) {
                const login = await server.mongo.db.collection('materials').aggregate([]).toArray();
            
                return login;
            }
        });

    }
}