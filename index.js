'use strict';
let server = require("../server/routes/index.js");
let db = require("../server/db/index.js")
var chai = require('chai');
let chaiHttp = require("chai-http");
var expect = chai.expect;
var request = require('supertest');

chai.should();
chai.use(chaiHttp);

describe('Questions APIs', () => {

  describe("GET for route /api/questionsAndAnswers/:id", () => {
    it("should return a 200 status", function(done) {
      chai.request(server)
      .get('/:id')
      .end((err, res) => {
        res.should.have.status(200);
      });
      done();
    })
  })

  describe("POST for route /api/questionsAndAnswers/questions", () => {
    it("should return a 201 status", (done) => {
      chai.request(server)
      .post('/questions')
      .end((err, res) => {
        res.should.have.status(201)
      })
      done()
    })
  })

  describe("POST for route /api/questionsAndAnswers/answers", () => {
    it("", (done) => {
      chai.request(server)
      done()
    })
  })

  describe("PUT for route /api/questionsAndAnswers/answers/helpful", () => {
    it("", (done) => {
      chai.request(server)
      done()
    })
  })

  describe("PUT for route /api/questionsAndAnswers/:id/questions/helpful", () => {
    it("", (done) => {
      chai.request(server)
      done()
    })
  })

  describe("PUT for route /api/questionsAndAnswers/:id/answers/report", () => {
    it("", (done) => {
      chai.request(server)
      done()
    })
  })

})