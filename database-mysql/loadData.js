const mysql = require('mysql');
const async = require('async');
const mysqlConfig = require('./config.js');
const pathToQuestions = ('../Datasets/questions.csv');
const pathToAnswers = ('../Datasets/answers.csv');
const pathToAnswersPhotos = ('../Datasets/answers_photos.csv');

//logs me in
const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('connected to sql database')
});

function loadQuestions() {
  return new Promise((resolve, reject) => {
  connection.query(`LOAD DATA LOCAL INFILE ? INTO TABLE questions
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)`,
  [pathToQuestions],
  function(err, results) {
    if (err) {
      console.log(err);
    } else {
      resolve(console.log('insert data into QUESTIONS complete'));
    }
  }
)
  })
}

function loadAnswers() {
  return new Promise((resolve, reject) => {
  connection.query(`LOAD DATA LOCAL INFILE ? INTO TABLE answers
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)`,
  [pathToAnswers],
  function(err, results) {
    if (err) {
      console.log(err);
    } else {
      resolve(console.log('insert data into ANSWERS complete'));
    }
  }
)
})
}

function loadAnswersPhotos() {
  return new Promise((resolve, reject) => {
  connection.query(`LOAD DATA LOCAL INFILE ? INTO TABLE answers_photo
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, answer_id, url)`,
  [pathToAnswersPhotos],
  function(err, results) {
    if (err) {
      console.log(err);
    } else {
      resolve(console.log('insert data into ANSWER PHOTOS complete'))
    }
  })
  })
}
const promise1 = loadQuestions()
const promise2 = loadAnswers()
const promise3 = loadAnswersPhotos()


Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log('all complete now');
  console.log('joining tables now...')
  connection.query(`

  `)
});
