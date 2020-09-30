const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const batimentController = require("./controllers/batimentController");

//dummy datas for testing purpose
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


let batiments = []; 


//HOME PAGE - GET - USERCONTROLLER@HOME
router.get('/', userController.home);

//REGISTER A USER - POST - USERCONTROLLER@REGISTER
router.post('/register', userController.register);
router.post('/login', userController.login)

//LIST OF ALL BUILDINGS - GET - BATIMENTSCONTROLLER@ALLBUILDINGS
router.get('/listbatiments', batimentController.listAllBuildings);

//UNIC BUILDING PER PARAMS
//router.get('/listbatiments/:buildingName', (req, res, next) => {
  //const requestedBatiment = req.params.buildingName;

  //batiments.forEach(function (batiment) {
    //const storedBatimentName = batiment.batiment;
    //if (storedBatimentName === requestedBatiment) {
      //console.log('match found');
    //}
  //})
//});

//CONTACT PAGE
//router.get('/contact', (req, res, next) => {
  //res.render('contact', {
    //contactContent: contactContent
  //});
//});

//CREATE BUILDING - GET
router.get('/create', batimentController.create)


//CREATE BUILDING - POST
router.post('/create_batiment', (req, res, next) => {
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