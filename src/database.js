const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: '3.84.13.202',
  user: 'axel',
  password: 'mantenimiento8a',
  database: 'cortessureste',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
