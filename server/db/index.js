const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'password',
  user: 'root',
  database: 'days_a_week',
  host: '127.0.0.1', //use localhost on M1 imac or omit
  port: '3306'
});

const days_a_week_db = {};

days_a_week_db.getData = (id) => {
 //remove later
  return new Promise((resolve, reject) => {
    pool.query(
    `
    SELECT
        JSON_OBJECT(
        'question_id', q.id,
        'question_body', q.body,
        'question_date', FROM_UNIXTIME(q.date_written/1000),
        'asker_name', q.asker_name,
        'question_helpfulness', q.helpful,
        'reported', CASE WHEN q.reported = 0 THEN 'False' ELSE 'True' END,
        'answers', JSON_OBJECT(
          a.a_id, JSON_OBJECT(
            'id', a.a_id,
            'body', a.answer_body,
            'date', a.date_time,
            'answerer_name', a.answerer_name,
            'helpfulness', a.helpful,
            'photos', JSON_ARRAY (
              a.url
            )
          )
        )
      ) results
    FROM questions q
    JOIN (SELECT
      aw.id as a_id,
      aw.question_id as question_id,
      aw.body as answer_body,
      FROM_UNIXTIME(aw.date_written/1000) as date_time,
      aw.answerer_name,
      aw.answerer_email,
      aw.reported,
      aw.helpful,
      CASE WHEN ap.url IS NULL THEN '"no pic"' ELSE ap.url END as url
    FROM answers aw
    LEFT JOIN answers_photo ap
    ON aw.id = ap.answer_id
    WHERE ap.answer_id IS NOT NULL
    ) AS a
    ON q.id = a.question_id
    WHERE product_id = ?
    UNION ALL
    SELECT
    JSON_OBJECT(
        'question_id', q.id,
        'question_body', q.body,
        'question_date', FROM_UNIXTIME(q.date_written/1000),
        'asker_name', q.asker_name,
        'question_helpfulness', q.helpful,
        'reported', CASE WHEN q.reported = 0 THEN 'False' ELSE 'True' END,
        'answers', JSON_OBJECT(
          12, JSON_OBJECT(
            'id', 12,
            'body', "test",
            'date', 0,
            'answerer_name', "test",
            'helpfulness', 0,
            'photos', JSON_ARRAY (
              "[]"
            )
          )
        )
      ) results
    FROM questions q
    LEFT JOIN answers a
    ON q.id = a.question_id
    WHERE a.question_id IS NULL
    AND product_id = ?
    `, [id, id], (err, results) => {
    if(err) {
      return reject(err);
    }
      let mySqlData = {
        "results": []
      }
        for (let i in results) {
          let data = JSON.parse(results[i]['results'])
          mySqlData["results"].push(data)
        }
    return resolve(mySqlData);
    });
  });
}


days_a_week_db.postQuestion = (res) => {
  console.log(res)
  return new Promise((resolve, reject) => {
    pool.query(`
    INSERT INTO questions (product_id, body, date_written, asker_name, asker_email)
    VALUES (5953, 'mandatory body', now(), 'mandatory name', 'mandatory@email.com')
    `,  (err, results) => {
      if (err) {
        console.log('error posting question')
        return reject(err);
      } else {
        console.log('question inserted into database')
        return resolve(results);
      }
    })
  })
}

days_a_week_db.update = () => {
  return new Promise((resolve, reject) => {

  })
}






module.exports = days_a_week_db;

