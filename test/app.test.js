const pactum = require('pactum');
const route = require('../server/routes/index.js');
const db = require('../server/db')
const port = 3000;
//const router = express.Router();

describe('App', function() {
  let spec = pactum.spec()
  let response;

  it('should return the json data for product_id 200', async () => {
    let results = await db.getData(200)
    spec.get('http://localhost:3000/api/questionsAndAnswers/200')
    spec.expectStatus(200)
    spec.expectJson({
      product_id: '200',
      results: []
    })
    .toss();
  })


  it('should save a new questions', async () => {
    let postResults = await db.postQuestion({
      "product_id": 0,
      "body": "test",
      "name": "test asker",
      "email": "test email"
    })
    await pactum.spec()
    .post('http://localhost:3000/api/questionsAndAnswers/')
    .withJson({
      "product_id": 0,
      "body": "test",
      "name": "test asker",
      "email": "test email"
    })
  })

  it('should save a new answer', async () => {
    await pactum.spec()
    .post('http://localhost:3000/api/questionsAndAnswers/')
    .withJson({
      "id": 0,
      "body": "test",
      "name": "test asker",
      "email": "test email",
      "photos": "[]"
    })
  })

  it('should update questions', function(done) {
    pactum.spec()
    .put(`http://localhost:3000/api/questionsAndAnswers/200/answers/report`)
    done()
  })


})