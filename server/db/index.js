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
  let product_id = 20; //remove later
  return new Promise((resolve, reject) => {
    pool.query(
    `SELECT
      q.product_id as product_id,
      JSON_ARRAY(JSON_OBJECT(
        "question_id", q.id,
        "question_body", q.body,
        "question_date", FROM_UNIXTIME(q.date_written/1000),
        "asker_name", q.asker_name,
        "question_helpfulness", q.helpful,
        "reported", q.reported,
      )) results,
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
    WHERE product_id = ?`, [product_id], (err, results) => {
    if(err) {
      return reject(err);
    }
    return resolve(results);
  });
  });
}

module.exports = days_a_week_db;