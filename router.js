const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const buildingController = require("./controllers/buildingController");


let batiments = []; 

//USER REALTED ROUTES
router.get('/', userController.home);
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

//BUILDINGS RELATED ROUTES
router.get('/create-building', userController.mustBeloggedIn, buildingController.viewCreateScreen);
router.get('/listbatiments', buildingController.listAllBuildings);



//CREATE BUILDING - POST
router.post('/create-building', userController.mustBeloggedIn, buildingController.createBuilding (req, res, next) => {
  const batiment = {
    batiment: req.body.batiment,
    adresse: req.body.adresse,
    zip: req.body.zip,
    ville: req.body.town,
    pce: req.body.pce,
    description: req.body.description,
    checkboxInventaire: req.body.checkboxInventaire,
    checkboxDetendeurs: req.body.checkboxDetendeurs,
    checkboxDevis: req.body.checkboxDevis,
    checkboxDevisValides: req.body.checkboxDevisValides,
    checkboxEngagement: req.body.checkboxEngagement,
    checkboxReglages: req.body.checkboxReglages,
    checkboxAttestation: req.body.checkboxAttestation
  };
  batiments.push(batiment);

});



module.exports = router;