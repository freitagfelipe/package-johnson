const pgClient = require("./_database");

async function connect() {
    await pgClient.connect();

    console.log("Database connected!");
    
    return pgClient;
}

module.exports = {
    connect
};