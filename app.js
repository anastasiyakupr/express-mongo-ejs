var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: __dirname + '/assets/scss',
  dest: __dirname + '/assets/css',
  prefix: '/css',
  indentedSyntax: false, // true = .sass and false = .scss
  outputStyle: 'compressed',
  sourceMap: true,
  debug: true
}));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', index);
app.use('/users', users);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// ===================== //
// START: Mongo
// ===================== //
//
// Connection
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/bookworm");
var db = mongoose.connection;
// Error
db.on('error', console.error.bind(console, 'connection error: '));
//
// ===================== //
// END: Mongo
// ===================== //

// ===================== //
// START: MySQL
// ===================== //
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'dev',
//   password : 'PWabc123',
//   database : 'Sandbox'
// });
//
// connection.connect();
// connection.query('SELECT * from Users', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });
// connection.end();
//
// ===================== //
// END: MySQL
// ===================== //

module.exports = app;
