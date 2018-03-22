var express = require('express');
var passport = require('passport');
var util = require('util');
var AmazonStrategy = require('passport-amazon').Strategy;

var AMAZON_CLIENT_ID = "--insert-id-here--"
var AMAZON_CLIENT_SECRET = "--insert-secret-here--";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Amazon profile is
//   serialized and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


// Use the AmazonStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Amazon
//   profile), and invoke a callback with a user object.
passport.use(new AmazonStrategy({
  clientID: AMAZON_CLIENT_ID,
  clientSecret: AMAZON_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/amazon/callback"
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

const app = express();
const port = process.env.PORT || 8000;

app.use(express.cookieParser());
app.use(express.bodyParser());
// app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router)



app.listen(port, () => console.log(`Listening on port ${port}`));