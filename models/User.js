const usersCollection = require('../db').collection('users');
const validator = require('validator');

let User = function (data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function() {
  if (typeof(this.data.username) != "string") { this.username.date = "" }
  if (typeof(this.data.email) != "string") { this.username.date = "" }
  if (typeof(this.data.password) != "string") { this.username.date = "" }
  
  //get ride of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password : this.data.password
  }
}

User.prototype.validate = function () {
  if (this.data.username == "") { this.errors.push("Vous devez fournir un nom d'utilisateur.") }
  if (this.data.username !="" && !validator.isAlphanumeric(this.data.username)){this.errors.push("Le nom d'utilisateur doit être composé uniquement de caractères alphanumériques.")}
  if (!validator.isEmail(this.data.email)) { this.errors.push("Vous devez fournir une adresse email valide.") }
  if (this.data.password == "") { this.errors.push("Vous ne pouvez laisser un mot de passe vide.") }
  if (this.data.password.length > 0 && this.data.password.length < 12) { this.errors.push("Le mot de passe doit être composé de 12 caractères minimum") }
  if (this.data.password.length > 100) { this.errors.push("Le mot de passe ne peux pas dépasser 100 caractères") }
  if (this.data.username.length > 0 && this.data.username.length < 3) { this.errors.push("Le nom être composé de 3  caractères minimum") }
  if (this.data.username.length > 30) { this.errors.push("Le nom d'utilisateur ne peux pas dépasser 30 caractères") }
  }


User.prototype.register = function () {
  //step 1 : validate user date
  this.cleanUp()//cleaning up datas sent from form (allowing just strings)
  this.validate()
  //setp 2 : only if there is no validation errors
  //then save the user data into database
  if (!this.errors.length) {
    usersCollection.insertOne(this.data)
  }
}

module.exports = User;