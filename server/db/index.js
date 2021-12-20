const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'password',
  user: 'root',
  database: 'days_a_week',
  host: 'localhost',
  port: '3306'
});

let days_a_week_db = {};

days_a_week_db.all = () => {

  return new Promise((resolve, reject) => {
    pool.query(
    `SELECT
    q.id as question_id,
    q.product_id as product_id,
    q.body as question_body,
    FROM_UNIXTIME(q.date_written/1000) as question_date,
    q.asker_name as asker_name,
    q.reported as reported,
    a.a_id as answer_id,
    a.answer_body as answer_body,
    a.date_time as answer_date,
    a.answerer_name as answerer_name,
    a.helpful as helpfulness,
    a.url as photos
  FROM questions q
  JOIN (SELECT
            aw.id as a_id,
            aw.question_id,
            aw.body as answer_body,
            FROM_UNIXTIME(aw.date_written/1000) as date_time,
            aw.answerer_name,
            aw.answerer_email,
            aw.reported,
            aw.helpful,
            ap.id,
            ap.url
            FROM answers aw
            JOIN answers_photo ap
            ON aw.id = ap.answer_id) AS a
  ON q.id = a.id
  LIMIT 100;
  `
  , (err, results) => {
    if(err) {
      return reject(err);
    }
    return resolve(results);
  });
  });
}


/*
//logs me in
const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('connected to sql database')
});

const getAllQuestionsAndAnswers = function(callback) {
  connection.query (
  `SELECT
    q.product_id,
    q.body,
    q.FROM_UNIXTIME(a.date_written/1000) as date_time,
    q.answerer_name,
    q.answerer_email,
    q.reported,
    q.helpful
  FROM questions q
  JOIN (SELECT  a.id,
          a.question_id,
          a.body as answer_body,
          FROM_UNIXTIME(q.date_written/1000) as date_time,
          a.answerer_name,
          a.answerer_email,
          a.reported,
          a.helpful,
          ap.id as ap_id,
          ap.url
  FROM answers a
  JOIN answers_photo ap
  ON a.id = ap.answer_id) as answers
  ON questions.id = answers.id
  LIMIT 100`
  , function(err, results) {
  if (err) {
      callback(err)
    } else {
      callback(null, results)
    }
  });
};
*/

module.exports = days_a_week_db;