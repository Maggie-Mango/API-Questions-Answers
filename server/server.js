const express = require('express');
var router = express.Router();
const sqlDb = require('../database-mysql');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})



