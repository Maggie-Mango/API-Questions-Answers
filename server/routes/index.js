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



//add
router.post('/', async (req, res, next) => {
  //console.log(res.body)
  try {
    await db.postQuestion(req.body)
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
  }
})

module.exports = router;