const Building = require('../models/Building')

exports.viewCreateScreen = function(req, res){
      res.render('create-building')
  }

exports.createBuilding = function (req, res) {
  let building = new Building(req.body)
  building.createBuilding().then(function (){
    res.redirect("/")
  }).catch(function (errors) {
    res.send(errors)
  })
} 


exports.listAllBuildings = function(req, res){
  res.render('listBuildings')
}



exports.viewSingleBuilding = async function (req , res) {
  try {
    let building = await Building.findSingleById(req.params.id)
    res.render('view-building' , { building: building})
  } catch {
    res.send('404 template will go here')
  }
}



