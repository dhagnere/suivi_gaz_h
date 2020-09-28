const mongodb = require('mongodb')
const connectionString ='mongodb+srv://jobwow:tobias33126470@cluster0.an1yh.mongodb.net/energyDB?retryWrites=true&w=majority'

 mongodb.connect(connectionString, { useNewUrlParser: true , useUnifiedTopology: true } , function(err , client){

  module.exports = client.db()
  const app = require('./app')
  app.listen(3000)
})
