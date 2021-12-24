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
/*
//post
router.post

//update
router.put
*/
module.exports = router;