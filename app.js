require('dotenv').config()
const createError = require('http-errors');
const methodOverride = require('method-override')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose=require('mongoose');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const passport= require('passport');
const flash = require('connect-flash');

const env=process.env;

mongoose.connect( env.DB_CONNECT);
require('./config/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs'

}));

app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(methodOverride('_method'))

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'motherFucker',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('errors/error');
});

module.exports = app;