const express = require('express');
const db =  require('../db');
const router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();

/*
//const redisClient = redis.createClient(redisUrl);
//redisClient.connect()
redisClient.on('connect',() => {
  console.log(`Connected to Redis on port ${REDIS_PORT}.`)
});

redisClient.set = util.promisify(redisClient.set)
*/

checkCache = (req, res, next) => {
  const { id } = req.params;
  redis.get(id, (err, data) => {
      if (err) {
          console.log(err);
          res.status(500).send(err);
      }
      //if no match found
      if (data !== null) {
          res.send(data);
      }
      else {
          //proceed to next middleware function
          next();
      }
  });
};


router.get('/:id', checkCache, async (req, res, next) => {

  try {
    const id = req.params.id;
    const response = await db.getData(id);
    const data = response
    redis.setex(id, 3600, JSON.stringify(data))
    res.json(response)
  } catch(err) {
    console.log(err)
    res.sendStatus(500);
  } finally {

  }

});


router.get('/:productId/:id/answers', async (req, res, next) => {
  console.log(req.params)
  try {
    let results = await db.getData(req.params.productId);
    res.json(results)
  } catch(err) {
    console.log(err)
  }
})

router.post('/questions', async (req, res, next) => {
  try {
    await db.postQuestion(req.body)
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
  }
})

router.post('/:id/answers', async (req, res, next) => {
  try {
    await db.postAnswer(req.body, req.params.id)
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
  }
})

router.put('/:id/questions/helpful', async (req, res, next) => {
  try {
    await db.updateQuestionsHelpful(req.params.id)
    res.sendStatus(204)
  } catch(err) {
    console.log(err)
  }
})

router.put('/:id/answers/helpful', async (req, res, next) => {
  try {
    await db.updateAnswersHelpful(req.params.id)
    res.sendStatus(204)
  } catch(err) {
    console.log(err)
  }
})


router.put('/:id/answers/report', async (req, res, next) => {
  try {
    await db.updateReport(req.params.id)
    res.sendStatus(204)
  } catch(err) {
    console.log(err)
  }
})

module.exports = router;





