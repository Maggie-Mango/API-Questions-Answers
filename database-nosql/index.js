const mongo = require('./config.js')
//SLqk4CTbNc2P6DT5
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