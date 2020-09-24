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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//setting up the public folder
app.use(express.static("public"));


//use the router
app.use('/', router);

//listen to port for server setup
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
