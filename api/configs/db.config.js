const env = process.env;
const Pool = require('pg').Pool

const db = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    ssl: true
})

module.exports = db;