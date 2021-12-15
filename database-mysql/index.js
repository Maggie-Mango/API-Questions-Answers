const mysql = require('mysql');
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

const loadQuestions = connection.query(`LOAD DATA LOCAL INFILE ? INTO TABLE questions
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)`,
  [pathToQuestions],
  function(err, results) {
    if (err, results) {
      console.log(err);
    } else {
      console.log('insert complete');
    }
  }
)

const loadAnswers = connection.query(`LOAD DATA LOCAL INFILE ? INTO TABLE questions
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)`,
  [pathToQuestions],
  function(err, results) {
    if (err, results) {
      console.log(err);
    } else {
      console.log('insert complete');
    }
  }
)

const loadPhotoAnswer = connection.query(`LOAD DATA LOCAL INFILE ? INTO TABLE answers_photo
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, answer_id, url)`,
  [pathToAnswersPhotos],
  function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log('insert complete')
    }
});

