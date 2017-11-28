'use strict';

// Database
var mongodb = require('./conn.js');

// Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var app = express();

// Sessions
app.use(session({
  secret: 'htmlcore',
  resave: true,
  saveUninitialized: false
}));

// Session Template Variables
app.use( function (req, res, next) {
  res.locals.title = "HTMLcore";
  res.locals.currentUser = req.session.userId;
  res.locals.alias = req.session.alias;
  res.locals.email = req.session.email;
  next();
});

// EJS View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Favicon
//app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

// Render
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: __dirname + '/assets/src/scss',
  dest: __dirname + '/assets/public/css',
  prefix: '/css',
  indentedSyntax: false, // true = .sass and false = .scss
  outputStyle: 'compressed',
  sourceMap: true,
  debug: true
}));
app.use(express.static(path.join(__dirname, 'assets/public')));

// Routes
var routes = require('./routes/');
app.use('/', routes);
var contact = require('./routes/contact');
app.use('/contact', contact);

// Catch 404 and forward to Error Handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// Error Handler
app.use(function(err, req, res, next) {

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  return res.render('error');

});

module.exports = app;
