let server = require("../server/routes/index.js");
let chai = require("chai");
let chaiHttp = require("chai-http");

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Questions APIs', () => {

  describe("GET for route /api/questionsAndAnswers/:id", () => {
    it("", (done) => {
      chai.request(server)
      done()
    })
  })

  describe("POST for route /api/questionsAndAnswers/questions", () => {
    it("", (done) => {
      chai.request(server)
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