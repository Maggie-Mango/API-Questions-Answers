const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'password',
  user: 'root',
  database: 'days_a_week',
  host: '127.0.0.1',
  port: '3306'
});
const days_a_week_db = {};

days_a_week_db.getData = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
  `
    SELECT
    JSON_OBJECT (
    'question_id', q.id,
    'question_body', q.body,
    'question_date', FROM_UNIXTIME(q.date_written/1000),
    'asker_name', q.asker_name,
    'question_helpfulness', q.helpful,
    'reported', CASE WHEN q.reported = 0 THEN 'False' ELSE 'True' END,
    'answers', JSON_OBJECT (
      0, JSON_OBJECT (
        'id', 0,
        'body', '"no answer yet"',
        'date', '',
        'answerer_name', '"n/a"',
        'helpfulness', '',
        'photos', JSON_ARRAY (
          '"null"'
        )
      )
    )
    ) results
    FROM questions q
    LEFT JOIN answers a
    ON q.id = a.question_id
    WHERE product_id = 1000011
    AND a.question_id IS NULL
    UNION ALL
    SELECT
      JSON_OBJECT(
      'question_id', a.question_id,
      'question_body', q.body,
      'question_date', FROM_UNIXTIME(q.date_written/1000),
      'asker_name', q.asker_name,
      'question_helpfulness', q.helpful,
      'reported', CASE WHEN q.reported = 0 THEN 'False' ELSE 'True' END,
      'answers', JSON_OBJECTAGG (
        a.a_id, JSON_OBJECT (
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
    LEFT JOIN (SELECT
    aw.id as a_id,
    aw.question_id as question_id,
    aw.body as answer_body,
    FROM_UNIXTIME(aw.date_written/1000) as date_time,
    aw.answerer_name,
    aw.answerer_email,
    aw.reported,
    aw.helpful,
    CASE WHEN ap.url IS NULL THEN '"null"' ELSE ap.url END as url
    FROM answers aw
    LEFT JOIN answers_photo ap
    ON aw.id = ap.answer_id
    ) AS a
    ON q.id = a.question_id
    WHERE product_id = 1000011
    AND a.question_id IS NOT NULL
    GROUP BY a.question_id
`, [id, id], (err, results) => {
    if(err) {
      return reject(err);
    }
    let mySqlData = {
      "product_id": id,
      "results": []
    }
    for (let i in results) {
      let data = JSON.parse(results[i]['results'])

      if (data['answers'][0]) {
        data['answers'] = []
      }

      mySqlData["results"].push(data)
    }
      return resolve(mySqlData);
    })
  })
}
/*
days_a_week_db.getAnswer = (answerId) => {
  console.log('in get place')
  console.log(typeof answerId)
  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT
      JSON_OBJECT(
      'answers', JSON_OBJECTAGG(
        a.id, JSON_OBJECT(
          'id', a.id,
          'body', a.body,
          'date', a.date_written,
          'answerer_name', a.answerer_name,
          'helpfulness', a.helpful,
          'photos', JSON_ARRAY(
            ap.url
          )
        )
      )
      ) results
      FROM answers a
      LEFT JOIN answers_photo ap
      ON a.id = ap.answer_id
      WHERE a.id = ?
      GROUP BY a.question_id;
      `
    , [answerId], (err, results) => {
      if(err) {
        console.log(err)
        return reject(err)
      }
      console.log('also in here')
      console.log(results)
      return resolve(results)
    })
  })
}
*/
days_a_week_db.postQuestion = (res) => {
  return new Promise((resolve, reject) => {
    let date = new Date()
    pool.query(`
    INSERT INTO questions (product_id, body, date_written, asker_name, asker_email)
    VALUES (?, ?, ${date.getTime()}, ?, ?)
    `, [res.product_id, JSON.stringify(res.body), JSON.stringify(res.name), res.email],  (err, results) => {
      if (err) {
        console.log('error posting question')
        return reject(err);
      } else {
        console.log(`question for ${res.product_id} inserted into database`)
        //res.redirect(/)???
        return resolve(results);
      }
    })
  })
}

days_a_week_db.postAnswer = (res, id) => {
  if (res.photos.length === 0) {
    res.photos = 'null'
  }
  let date = new Date()
  let sql1 = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email) VALUES (?, ?, ?, ?, ?)`
  let sql2 =
  `INSERT INTO answers_photo (answer_id, url) VALUES ((SELECT MAX(id) FROM answers), ?)`
  let insert1 = [JSON.stringify(id), JSON.stringify(res.body), date.getTime(), JSON.stringify(res.name), JSON.stringify(res.email)]
  let insert2 = [JSON.stringify(res.photos)]
  Promise.all([
    pool.query(sql1, insert1),
    pool.query(sql2, insert2)
  ]).then(function([sql1results, sql2results]) {
    console.log('succesfully posted to answers')
  }).catch((err) => {
    console.log(err)
  })
}


days_a_week_db.updateQuestionsHelpful = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      UPDATE questions q SET q.helpful = q.helpful + 1 WHERE id = ?
    `, [id], (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log('helpful updated')
      }
    })
  })
}

days_a_week_db.updateAnswersHelpful = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      UPDATE answers a SET a.helpful = a.helpful + 1 WHERE id = ?
    `, [id], (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log('answers - helpful updated')
      }
    })
  })
}

days_a_week_db.updateReport = (res, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      UPDATE answers a SET a.reported = 1 WHERE id = ?
    `, [id], (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log('answer reported')
      }
    })
  })
}
module.exports = days_a_week_db;
