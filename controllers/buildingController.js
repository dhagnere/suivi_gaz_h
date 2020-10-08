const Batiment = require('../models/Batiment')

exports.viewCreateScreen = function(req, res){
      res.render('create-building')
  }

exports.createBuilding = function(req, res){
  let batiment = new Batiment(req.body)
  batiment.create()
  if (batiment.errors.length) {
    res.send(batiment.errors)
  } else {
    res.render('create-building')
  }
}

exports.listAllBuildings = function(req, res){
  res.redirect('listbatiments', {
   
  })
}







