const dotenv = require('dotenv')
dotenv.config()
const MongoClient = require('mongodb').MongoClient
//const mongoose = require('mongoose')

//mongoose local connect
MongoClient.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true })
  .then(function (client) {
   module.exports = client
    const app = require('./app')
    app.listen(process.env.PORT)
  }).catch(err =>console.error(err))

 
  

