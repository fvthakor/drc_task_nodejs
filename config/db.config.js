const mysql = require('mysql');

const dbConfig = {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'proTechno@2021',
    database: 'drc_task',
    connectionLimit: 10,
};
const pool = mysql.createPool(dbConfig);

module.exports = {
    pool
}