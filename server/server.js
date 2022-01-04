const express = require('express');
const app = express();
const sqlDb = require('./db/index.js');
const apiRouter = require('./routes');
const redis = require("redis");
var cors = require('cors');
const util = require("util")

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);
redisClient.on('connect',() => {
  console.log(`Connected to Redis on port ${REDIS_PORT}.`)
});

redisClient.set = util.promisify(redisClient.set)



app.post("/", (req, res) => {

  redisClient.set()
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/questionsAndAnswers', apiRouter);

//function that runs when we hit a specific route


app.listen(process.env.PORT || '3000', () => {
  console.log(`Server is running on port ${process.env.PORT || '3000'}`)
});

