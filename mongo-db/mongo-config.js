const mongoose  = require('mongoose')
const mongoPath = 'mongodb+srv://maggie_mango:SLqk4CTbNc2P6DT5@cluster0.g16pq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewURLParser: true,
    useUnifiedTopology: true
  })
  return mongoose
}