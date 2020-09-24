const Batiment = require('../models/Batiment')

exports.create = function(req, res){
  let batiment = new Batiment(req.body)
  batiment.create()
  if (batiment.errors.length) {
    res.send(batiment.errors)
  } else {
    res.render('create')
  }
}

exports.listAllBuildings = function(req, res){
  res.render('listbatiments', {
    listBatiments : listBatiments
  })
}







