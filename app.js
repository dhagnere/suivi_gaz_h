//jshint esversion:6

const express = require("express");
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require("body-parser");
const ejs = require("ejs");

//Router setup
const router = require("./router");

const app = express();

let sessionOptions = session({
  secret: "my name is jobwow",
  store: new MongoStore({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge : 1000*60*60*24, httpOnly:true
  }
})

app.use(sessionOptions)

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

