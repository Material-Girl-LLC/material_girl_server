// const {
//     materialsTable
//   } = require('../config/db_constants');

const materialsTable = 'materials';
  
exports.plugin = {
    name: 'db_populate_materials',
    dependencies: ['hapi-mongodb'],
    register: async (server, options) => {

        const db = server.mongo.db;
        // const ObjectID = server.mongo.ObjectID;

        console.log("Searching for Materials Collection");
        try {
        const result = await db.listCollections({ name: materialsTable }).toArray();
        if (result.length > 0 ) {
            console.log("Collection already exists... we're done here.");
            return;
        }
        }
        catch (err) {
        console.log("ERROR:", err.code);
        throw (err);
        }

        console.log("Creating Materials Collection");
        try {
        await db.createCollection(materialsTable);
        }
        catch (err) {
        console.log("ERROR:", err.code);
        throw (err);
        }
    }
};