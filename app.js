//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//Router setup
const router = require("./router");

const app = express();

//Setting views and view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//setting up bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//setting up the public folder
app.use(express.static("public"));


//use the router
app.use('/', router);

module.exports = app

