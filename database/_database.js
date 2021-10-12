const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pgClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pgClient
