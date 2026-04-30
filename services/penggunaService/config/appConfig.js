require('dotenv').config();
const mysql = require('mysql2/promise');

const config = {
    jwtSecret: process.env.JWT_SECRET
};

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3307
});

module.exports = { config, db };