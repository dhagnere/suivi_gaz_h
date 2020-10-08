var createError = require('http-errors');
const express = require("express");
var path = require('path');

var expressLayout = require('express-ejs-layouts');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
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
app.use(flash())

//put our session in locals to be able to use in ejs
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  next()
})



//setting up bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//setting up the public folder
app.use(express.static ('public'));
//Setting views and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//use the router
app.use('/', router);

//app.use(function(req, res, next) {
//  next(createError(404));
//});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app

