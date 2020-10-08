const User = require('../models/User')

exports.mustBeloggedIn = function (req , res , next) {
  if (req.session.user) {
    next()
  } else {
    req.flash('errors', "Vous devez être connecté pour utiliser cette fonctionnalité")
    req.session.save(function () {
      res.redirect('/')
    })
  }
}

exports.login = function (req , res) {
  let user = new User(req.body)
  user.login()
    .then(function (result) {
    //if promise is resolved in User model
    req.session.user = {avatar: user.avatar , username: user.data.username}
    req.session.save(function (){
      res.redirect('/')
    })
  }).catch(function (e) {
    req.flash('errors', e)
    req.session.save(function () {
      res.redirect('/')
    })
    res.redirect('/')
  })//if promise is rejected in User Model
}

exports.logout = function (req , res) {
  req.session.destroy(function () {
    res.redirect('/')
  }) 
}

exports.register = function(req, res) {
  let user = new User(req.body)
  user.register().then(() => {
    req.session.user = {avatar : user.avatar , username: user.data.username}
    req.session.save(function() {
      res.redirect('/')
    })
  }).catch((regErrors) => {
    regErrors.forEach(function(error) {
      req.flash('regErrors', error)
    })
    req.session.save(function() {
      res.redirect('/')
    })
  })
}

exports.home = function(req, res) {
  if (req.session.user) {
    res.render('home-dashboard')
  } else {
    res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
  }
}

