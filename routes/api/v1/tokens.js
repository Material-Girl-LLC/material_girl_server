'use strict';

const pluginName = 'tokens';

exports.plugin = {
    name: pluginName,
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example

        server.route({
            method: 'GET',
            path: '/' + pluginName,
            handler: async function (request, h) {
                const tokens = await server.mongo.db.collection('tokens').aggregate([]).toArray();

                return tokens;
            }
        });

        server.route({
            method: 'POST',
            path: '/' + pluginName,
            handler: async function (request, h) {

                const payload = request.payload;

                console.log(payload);

                const status = await server.mongo.db.collection('tokens').insertOne(payload);

                return {"code": 200};

            }
        });

        server.route({
            method: 'GET',
            path: '/' + pluginName + '/{id}',
            handler: async function (request, h) {
                const id = request.params.id;
                const ObjectID = request.mongo.ObjectID;

                const token = await server.mongo.db.collection('tokens').findOne({_id: new ObjectID(id)});

                return token;
            }

        });

        server.route({
            method: 'DELETE',
            path: '/' + pluginName + '/{id}',
            handler: async function (request, h) {
                const id = request.params.id;
                const ObjectID = request.mongo.ObjectID;

                const status = await server.mongo.db.collection('tokens').deleteOne({_id: ObjectID(id)});

                return status;
            }

        })

        // etc ...
        // await someAsyncMethods();
    }
};