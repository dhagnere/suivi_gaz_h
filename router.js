const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

//dummy datas for testing purpose
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const listBatiments = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
//end of dummy dtas

let batiments = []; 

//HOME PAGE - GET - USERCONTROLLER@HOME
router.get('/', userController.home);
//REGISTER A USER - POST - USERCONTROLLER@REGISTER
router.post('/register', userController.register);

//LIST OF ALL BUILDINGS - GET
router.get('/listbatiments', (req , res , next) => {
  res.render('listbatiments', {
    listBatiments: listBatiments,
    batiments: batiments
  });
});

//UNIC BUILDING PER PARAMS
router.get('/listbatiments/:buildingName', (req, res, next) => {
  const requestedBatiment = req.params.buildingName;

  batiments.forEach(function (batiment) {
    const storedBatimentName = batiment.batiment;
    if (storedBatimentName === requestedBatiment) {
      console.log('match found');
    }
  })
});

//CONTACT PAGE
router.get('/contact', (req, res, next) => {
  res.render('contact', {
    contactContent: contactContent
  });
});

//CREATE BUILDING - GET
router.get('/create', (req, res, next) => {
  res.render('create');
});

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
  res.redirect('/listbatiments');
});



module.exports = router;