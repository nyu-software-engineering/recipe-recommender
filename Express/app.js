let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let app = express();
const db = require( './db.js' );
require('./auth');

//for adding new routes
let index = require('./routes/index');
let users = require('./routes/users');
let recipe = require('./routes/recipe');

const passport = require('passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


const session = require('express-session');
const sessionOptions = {
    secret: 'secret!',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// NOTE: initialize passport and let it know that we're enabling sessions
app.use(passport.initialize());
app.use(passport.session());


//add any new routes, make sure you also define above
app.use('/', index);
app.use('/users', users);
app.use('/recipe', recipe);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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

module.exports = app;
