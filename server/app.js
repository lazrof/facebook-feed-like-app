var createError = require('http-errors');
var express     = require('express');
var path        = require('path');
var logger      = require('morgan');


/**
* 
* DB Connection
*
**/

const db = require('./config/database');
db.connect();


/**
* 
* Routes
*
**/

const users = require('./routes/users');
const auth = require('./routes/auth');


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.json('Hello WMundo');
});


/**
* 
* URls
*
**/

app.use('/', auth);
app.use('/users', users)



/**
* 
* Catch 404 and forward to error handler
*
**/

app.use(function(req, res, next) {
  next(createError(404));
});


/**
* 
* Error Handler
*
**/

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
