const Batiment = require('../models/Batiment')

exports.create = function(req, res){
  let batiment = new Batiment(req.body)
  batiment.create()
  if (batiment.errors.length) {
    res.send(batiment.errors)
  } else {
    res.render('create' , {username: req.session.user.username , avatar: req.session.user.avatar})
  }
}

exports.listAllBuildings = function(req, res){
  res.redirect('listbatiments', {
   
  })
}







