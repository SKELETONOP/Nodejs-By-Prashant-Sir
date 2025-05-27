const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Arpita@bulu2',
  database: 'airbnb'
});

module.exports = pool.promise();
