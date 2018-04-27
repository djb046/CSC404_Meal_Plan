var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var util = require('util');
var AmazonStrategy = require('passport-amazon').Strategy;
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var surveyRouter = require('./routes/survey');
//var create_meal_plan = require('./routes/create-meal-plan');
var db = require('./routes/db');
var generateMealPlan =  require('./routes/generateMealPlan');
var survey = require('./routes/survey');
var createMealPlan = require('./routes/createMealPlan');
var viewMealPlan = require('./routes/viewMealPlan');
var editUserInfo = require('./routes/editUserInfo');
var dashboard = require('./routes/dashboard');

var AMAZON_CLIENT_ID = "amzn1.application-oa2-client.c84a394dab3c4fea9d228b3881caf672"
var AMAZON_CLIENT_SECRET = "7f09ba172422925cc657d73fb59bcd1384a22a6f74190bd8cefec554a7fea5f4";
var FITBIT_CLIENT_ID = "22CX5T";
var FITBIT_CLIENT_SECRET = "a3bd56e066315c5f394ac9c20e017a5a";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  
  done(null, obj);
});


passport.use(new AmazonStrategy({
  clientID: AMAZON_CLIENT_ID,
  clientSecret: AMAZON_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/amazon/callback"
},
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Amazon profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Amazon account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;;

passport.use(new FitbitStrategy({
    clientID:     FITBIT_CLIENT_ID,
    clientSecret: FITBIT_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/fitbit/callback"
  },
  function(accessToken, refreshToken, profile, done) {
     process.nextTick(function () {
    // User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
      // return done(err, user);
      });
     return done(null, user);
  }
));

var app = express();


console.log('listening on port 3000')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'jsx')));
app.use(express.static(path.join(__dirname, 'jsx/images')));
// app.use(express.static(path.join(__dirname, 'jsx')));

app.use('/generateMealPlan', generateMealPlan);
app.use('/survey', survey);
app.use('/createMealPlan', createMealPlan);
app.use('/viewMealPlan', viewMealPlan);
app.use('/editUserInfo', editUserInfo);
app.use('/dashboard', dashboard);

app.get('/', function (req, res) {
  res.render('index', { user: req.user });
});
// branch
// this is how we can sercure our routes in the future
// app.get('/account', ensureAuthenticated, function (req, res) {
//   res.render('account', { user: req.user });
// });

app.get('/test', function (req, res) {
  res.render('test', {});
});

app.get('/testNutes', function (req, res) {
  res.render('nutritionTest', {});
});

app.get('/auth/fitbit',
  passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile'] }
));

app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', { 
        successRedirect: '/auth/fitbit/success',
        failureRedirect: '/auth/fitbit/failed'
}));

app.get('/auth/amazon',
  passport.authenticate('amazon', { scope: ['profile', 'postal_code'] }),
  function (req, res) {
    // The request will be redirected to Amazon for authentication, so this
    // function will not be called.
  });

// GET /auth/amazon/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/amazon/callback',
  passport.authenticate('amazon', { failureRedirect: '/login' }),
  function (req, res) {
    db.getConnection(function (err, mclient) {//"'+id+'", "'+displayName+'"
      mclient.query('INSERT INTO amazonAuth(id, name, new) VALUES ("' + req.user.id + '", "' + req.user.displayName + '", 0) ON DUPLICATE KEY UPDATE amazonAuth.name = amazonAuth.name ', function (err, rows, fields) {
         //mclient.release();

        if (err) throw err;

        console.log("Attempting to add a new user...");
      });

    });

    db.getConnection(function (err, mclient) {

      console.log(req.user.id);
      mclient.query('SELECT new FROM amazonAuth WHERE amazonAuth.id = "' + req.user.id + '"', function (err, rows, fields) {
        

        if (err) throw err;
        console.log(rows[0]);
        if (rows[0].new == 0) {
          console.log("Found a new user");
          res.redirect('/survey');
        }
        else {
          console.log("Found a old user");
          res.redirect('/dashboard');
        }
        mclient.release();
        // when survey completed.
        // UPDATE `mealplan`.`amazonAuth` SET `new`='1' WHERE `id`='amzn1.account.AGC5T3ZS5AH3GDLS76LY4ICG325Q';

        // res.render('Survey', { user: req.user });

      });
    });
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


// TODO add this to routes to check premissions $$$$$
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

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
  res.render('error');
});

// app.post('/newUser', function (req, res) 
// {

// console.log("TEST");
// var newUserq = "INSERT INTO amazonAuth(id, name) VALUES ('test', 'test') ON DUPLICATE KEY UPDATE amazonAuth.name = amazonAuth.name";
// // connection.query('INSERT INTO amazonAuth WHERE NOT EXISTS (SELECT * FROM amazonAuth WHERE id = "test" LIMIT 1) VALUES (?)', "test", "test", function(err, result)
// connection.query(newUserq, function(err, result)
// {
// if(err) throw err
//   console.log("inserted user")
// });

// });

// db.getConnection(function(err, mclient) {
//   mclient.query('SELECT * FROM userData', function (err, rows, fields)
//     {

//     if (err) throw err

//     console.log("Test WORKS")
//     });
// });

module.exports = app;
