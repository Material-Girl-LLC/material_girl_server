'use strict';

const pluginName = 'materials';

exports.plugin = {
    name: pluginName,
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example

        server.route({
            method: 'GET',
            path: '/' + pluginName,
            handler: async function (request, h) {
                const materials = await server.mongo.db.collection('materials').aggregate([]).toArray();

                return materials;
            }
        });

        server.route({
            method: 'POST',
            path: '/' + pluginName,
            handler: async function (request, h) {

                const payload = request.payload;

                console.log(payload);

                const status = await server.mongo.db.collection('materials').insertOne(payload);

                return {"code": 200};

            }
        });

        server.route({
            method: 'GET',
            path: '/' + pluginName + '/{id}',
            handler: async function (request, h) {
                const id = request.params.id;
                const ObjectID = request.mongo.ObjectID;

                const material = await server.mongo.db.collection('materials').findOne({_id: new ObjectID(id)});

                return material;
            }

        });

        server.route({
            method: 'DELETE',
            path: '/' + pluginName + '/{id}',
            handler: async function (request, h) {
                const id = request.params.id;
                const ObjectID = request.mongo.ObjectID;

                const status = await server.mongo.db.collection('materials').deleteOne({_id: ObjectID(id)});

                return status;
            }

        })

        // etc ...
        // await someAsyncMethods();
    }
};