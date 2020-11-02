const bcrypt = require('bcryptjs')
const usersCollection = require('../db').db().collection('users');
const validator = require('validator');
const md5 = require('md5')

let User = function (data) {
  this.data = data
  this.errors = []
}
//cleaning up datas form
User.prototype.cleanUpRegisterForm = function() {
  if (typeof(this.data.username) != "string") { this.username.data = "" }
  if (typeof(this.data.email) != "string") { this.email.data = "" }
  if (typeof(this.data.password) != "string") { this.password.data = "" }
  //get ride of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password : this.data.password
  }
}

User.prototype.cleanUpLoginForm = function() {
  if (typeof(this.data.username) != "string") { this.username.data = "" }
  if (typeof(this.data.password) != "string") { this.password.data = "" }
  //get ride of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    password : this.data.password
  }
}
//validating form datas
User.prototype.validate = function () {
  return new Promise(async (resolve , reject) => {
    if (this.data.username == "") { this.errors.push("Vous devez fournir un nom d'utilisateur.") }
    if (this.data.username !="" && !validator.isAlphanumeric(this.data.username)){this.errors.push("Le nom d'utilisateur doit être composé uniquement de caractères alphanumériques.")}
    if (!validator.isEmail(this.data.email)) { this.errors.push("Vous devez fournir une adresse email valide.") }
    if (this.data.password == "") { this.errors.push("Vous ne pouvez laisser un mot de passe vide.") }
    if (this.data.password.length > 0 && this.data.password.length < 12) { this.errors.push("Le mot de passe doit être composé de 12 caractères minimum") }
    if (this.data.password.length > 50) { this.errors.push("Le mot de passe ne peux pas dépasser 50 caractères") }
    if (this.data.username.length > 0 && this.data.username.length < 3) { this.errors.push("Le nom être composé de 3  caractères minimum") }
    if (this.data.username.length > 30) { this.errors.push("Le nom d'utilisateur ne peux pas dépasser 30 caractères") }
  //ony if username is valid then check if allready in use  
    if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username))
    {
      let usernameExists = await usersCollection.findOne({ username : this.data.username})
      if (usernameExists) {this.errors.push('Le nom d\'utilisateur existe déja')}
    }
    if (validator.isEmail(this.data.email))
    {
      let emailExists = await usersCollection.findOne({ email : this.data.email})
      if (emailExists) {this.errors.push('Le mail existe déja')}
    }resolve()
  })
}

//user login
User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUpLoginForm()//step 1 validate user data
    usersCollection.findOne({ username: this.data.username }).then((attemptedUser) => {   // step 2 check bd if user exist
      if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
        this.data = attemptedUser
        this.getAvatar()
        resolve('ok')
      } else {
        reject('Le mot de passe ou l\'utilisateur sont incorrects')
      }
    })
      .catch(function () {
        reject("Veuillez essayer plus tard...")
      })
  })
}


  User.prototype.register = async function () {
    //step 1 : validate user date
    return new Promise(async (resolve, reject) => {
      // Step #1: Validate user data
      this.cleanUpRegisterForm()
      await this.validate()
    
      // Step #2: Only if there are no validation errors 
      // then save the user data into a database
      if (!this.errors.length) {
        // hash user password
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password, salt)
        await usersCollection.insertOne(this.data)
        this.getAvatar()
        resolve()
      } else {
        reject(this.errors)
      }
    })
  }

User.prototype.getAvatar = function () {
    this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`
  }

module.exports = User