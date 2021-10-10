const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pgClient = new Client({
    connectionString: process.env.DB_URI,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pgClient