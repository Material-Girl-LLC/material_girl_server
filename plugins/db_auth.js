const tokensTable = 'tokens';
  
exports.plugin = {
    name: 'db_populate_tokens',
    dependencies: ['hapi-mongodb'],
    register: async (server, options) => {

        const db = server.mongo.db;
        // const ObjectID = server.mongo.ObjectID;

        console.log("Searching for Tokens Collection");
        try {
        const result = await db.listCollections({ name: tokensTable }).toArray();
        if (result.length > 0 ) {
            console.log("Collection already exists... we're done here.");
            return;
        }
        }
        catch (err) {
        console.log("ERROR:", err.code);
        throw (err);
        }

        console.log("Creating Tokens Collection");
        try {
        await db.createCollection(tokensTable);
        }
        catch (err) {
        console.log("ERROR:", err.code);
        throw (err);
        }
    }
};