var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ClientOAuth2 = require('client-oauth2');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var collectRouter = require('./routes/collect');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize planmill client and use it globally.
app.locals.planmillAuth = new ClientOAuth2({
  clientId: process.env.PLANMILL_CLIENT_ID,
  clientSecret: process.env.PLANMILL_CLIENT_SECRET,
  accessTokenUri: process.env.PLANMILL_ACCESS_TOKEN_URI,
  authorizationUri: process.env.PLANMILL_AUTHORIZATION_URI,
  redirectUri: process.env.PLANMILL_REDIRECT_URI,
  scopes: [],
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/collect', collectRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
