const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const sql =
`DROP DATABASE IF EXISTS days_a_week;
CREATE DATABASE days_a_week;
USE days_a_week;
CREATE TABLE questions (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  body VARCHAR(600),
  date_written bigint NOT NULL DEFAULT 0,
  asker_name varchar(100),
  asker_email VARCHAR(100) NOT NULL,
  reported INT DEFAULT 0,
  helpful INT DEFAULT 0,
  PRIMARY KEY (id)
);
CREATE TABLE answers (
  id INT NOT NULL AUTO_INCREMENT,
  question_id INT NOT NULL DEFAULT 0,
  body VARCHAR(600) NOT NULL DEFAULT 'no body',
  date_written bigint NOT NULL DEFAULT 0,
  answerer_name VARCHAR(100) NOT NULL DEFAULT 'no name',
  answerer_email VARCHAR(100) NOT NULL DEFAULT 'no email',
  reported INT,
  helpful INT,
  PRIMARY KEY (id)
);
CREATE TABLE answers_photo (
  id INT NOT NULL AUTO_INCREMENT,
  answer_id INT NOT NULL DEFAULT 666,
  url VARCHAR(200) NOT NULL DEFAULT 'no pic',
  PRIMARY KEY (id)
);
ALTER TABLE questions ADD INDEX product_id_index (product_id);
ALTER TABLE answers_photo ADD INDEX answer_id_index (answer_id);
ALTER TABLE answers ADD INDEX question_id_index (question_id);
`
const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('connected to sql database')
  let createDbs = sql;
  connection.query(createDbs, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    } else {
      console.log('databases created!')
    }
  });
  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
});
