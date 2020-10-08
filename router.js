const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const buildingController = require("./controllers/buildingController");


let buildings = []; 

//USER REALTED ROUTES
router.get('/', userController.home);
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

//BUILDINGS RELATED ROUTES

//get view for cree building form
router.get('/create-building', userController.mustBeLoggedIn, buildingController.viewCreateScreen);
//get view for listing all buildings
router.get('/listBuildings', buildingController.listAllBuildings);
//get view for one batiment
router.get('/view-building/:id' , buildingController.viewSingleBuilding)



//CREATE BUILDING - POST
router.post('/create-building', userController.mustBeLoggedIn, buildingController.createBuilding);



//CATEGORY RELATED ROUTES
//create categories
//show categoeries
  
module.exports = router;