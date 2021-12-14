CREATE DATABASE IF EXISTS days_a_week;

CREATE DATABASE days_a_week;

USE days_a_week;


CREATE TABLE questions (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  date_written TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  asker_email VARCHAR(60) NOT NULL,
  reported INT,
  helpful INT
)

CREATE TABLE answers (
  id INT NOT NULL AUTO_INCREMENT,
  question_id INT,
  body VARCHAR(200) NOT NULL,
  date_written TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported INT,
  helpful INT
)

CREATE TABLE answers_photo (
  id INT NOT NULL AUTO_INCREMENT,
  answer_id INT,
  url VARCHAR(100)
)