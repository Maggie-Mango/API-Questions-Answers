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
LIMIT 30;

INSERT INTO questions (body, date_written, asker_name, asker_email)
VALUES ("body", now(), "name”, “asker@email.com”);