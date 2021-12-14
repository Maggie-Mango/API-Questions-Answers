const mysql = require('mysql2');
const mysqlConfig = require('./config.js');


const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('connected to sql database')
})