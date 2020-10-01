const User = require('../models/User')

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";



let batiments = [];

exports.login = function (req , res) {
  let user = new User(req.body)
  user.login().then(function (result) {
    //if promise is resolved in User model
    req.session.user = {username: user.data.username}
    req.session.save(function (){
      res.redirect('/')
    })
  }).catch(function (e) {
    res.send(e)
  })//if promise is rejected in User Model

}

exports.logout = function (req , res) {
  req.session.destroy(function () {
    res.redirect('/')
  }) 
}

exports.register = function(req, res){
  let user = new User(req.body)
  user.register()
  if (user.errors.length) {
    res.send(user.errors)
  } else {
    res.send("bravo pas d'erreur")
  }
}

exports.home = function (req, res) {
  if (req.session.user) {
    res.render('home-dashboard', {
      username: req.session.user.username
    })
  } else {
    res.render('home-guest', {
      batiments: batiments
    });
  }
}