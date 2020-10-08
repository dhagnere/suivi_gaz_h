const buildingCollection = require('../db').db().collection("buildings")
const ObjectID = require('mongodb').ObjectID;
const { ObjectId } = require('mongodb');
const validator = require('validator');

let Building = function (data) {
  this.data = data
  this.errors = []
}

Building.prototype.cleanUp = function () {
  //cleaning up datas from form
  if (typeof (this.data.batiment) != "string") { this.data.batiment = "" }
  if (typeof (this.data.adresse) != "string") { this.data.adresse = "" }
  if (typeof (this.data.zip) != "string") { this.data.zip = "" }
  if (typeof (this.data.town) != "string") { this.data.town = "" }
  if (typeof(this.data.category) !="string" ) {this.data.category = ""}
  if (typeof (this.data.pce) != "string") { this.data.pce = "" }
  if (typeof (this.data.description) != "string") { this.data.description = "" }
  
  //get rid of any bogus properties
  this.data = {
    batiment: this.data.batiment.trim(),
    adresse: this.data.adresse.trim(),
    zip: this.data.zip.trim(),
    town: this.data.town.trim(),
    category: this.data.category.trim(),
    pce: this.data.pce.trim(),
    description: this.data.description.trim(),
    maps : this.data.maps.trim(),
    createdDate: new Date()
  }
}

Building.prototype.validate = function () {
  //validate datas from form
  if (this.data.batiment == "") { this.errors.push("Le nom de l'entité ne peux être vide !") } 
  if (this.data.adresse == "") { this.errors.push("L'adresse de l'entité ne peux être vide !") }
  if (this.data.zip == "") { this.errors.push("Le code postal ne peux être vide !") } 
  if (this.data.town == "") { this.errors.push("Veuillez renseigner la ville !") } 
  if (this.data.category == "") { this.errors.push("Choisissez une catégorie représentant l'entité !") } 
  if (this.data.pce == "") { this.errors.push("Un numéro de PCE, PDL, ou compteur est obligatoire !") } 
}



Building.prototype.createBuilding = async function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      //save building in db
      await buildingCollection.insertOne(this.data)
      resolve()
    } else {
      this.errors.push("Veuillez essayer ultérieurement...")
      reject(this.errors)
    }
  })
}

Building.findSingleById = function (id) {
  return new Promise( async function (resolve, reject) {
    if (typeof (id) != "string" || !ObjectID.isValid(id)) {
      reject()
      return
    }
    let building = await  buildingCollection.findOne({ _id: new ObjectId(id) })
    if (building) {
      resolve(building)
    } else {
      reject()
    }
  })
}

module.exports = Building;


