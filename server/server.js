const express = require('express');
const app = express();
const sqlDb = require('./db/index.js');
const apiRouter = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/questionsAndAnswers', apiRouter);


app.listen(process.env.PORT || '3000', () => {
  console.log(`Server is running on port ${process.env.PORT || '3000'}`)
});



