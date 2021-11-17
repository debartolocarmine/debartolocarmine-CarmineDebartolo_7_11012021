var mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PWD,
  database : process.env.DB_NAME,
  multipleStatements: true
});

module.exports = pool;