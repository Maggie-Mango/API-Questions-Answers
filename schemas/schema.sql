DROP DATABASE IF EXISTS days_a_week;

CREATE DATABASE days_a_week;


USE days_a_week;

CREATE TABLE questions (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  body VARCHAR(600),
  date_written bigint NOT NULL,
  asker_name varchar(100),
  asker_email VARCHAR(100) NOT NULL,
  reported INT,
  helpful INT,
  PRIMARY KEY (id)
);

CREATE TABLE answers (
  id INT NOT NULL AUTO_INCREMENT,
  question_id INT,
  body VARCHAR(600) NOT NULL,
  date_written bigint NOT NULL,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported INT,
  helpful INT,
  PRIMARY KEY (id)
);

CREATE TABLE answers_photo (
  id INT NOT NULL AUTO_INCREMENT,
  answer_id INT,
  url VARCHAR(200),
  PRIMARY KEY (id)
);

SELECT
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
LIMIT 30/K;
