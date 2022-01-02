const express = require('express');
const db =  require('../db');
const router = express.Router();


router.get('/:id', async (req, res, next) => {
  try {
    let results = await db.getData(req.params.id);
    res.json(results)
  } catch(err) {
    console.log(err)
    res.sendStatus(500);
  }
});

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





