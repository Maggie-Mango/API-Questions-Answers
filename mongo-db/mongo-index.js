const mongo = require('./config.js')

const connectToMongoDb = async () => {
  await mongo().then(mongoose => {
    try {
      console.log('Connected to MongoDb')
    } finally {
      mongoose.connection.close()
    }
  })
}

connectToMongoDb()