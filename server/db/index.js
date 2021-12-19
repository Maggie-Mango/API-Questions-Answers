const mysql = require('mysql');
const mysqlConfig = require('./config.js');

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

module.exports = {
  getAllQuestionsAndAnswers
}