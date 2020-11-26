const express = require("express");
const app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var userData;

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '624380618870-aeqhpj00upevdkd66lo0bd06vor0vq4f.apps.googleusercontent.com',
  clientSecret: 'of-TGiusjrWmW6mO53bP10pd',
  callbackURL: 'http://localhost:8081/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
  // var userData = {identifier: identifier};
  console.log(profile);
  // userData=profile;
  // append more data if needed
  // userData.email = profile.emails[0];
  // userData.displayName = profile.displayName;
  // userData.fullName = profile.familyName + " " + profile.givenName;
  // userData.imageUrl = profile.imageUrl;
  // id is optional
  // if (profile.id) {
  //   userData.id = profile.id;
  // }

  return done(null, profile);
}
));

var session = require('express-session');
app.use(session({secret: "enter custom sessions secret here"}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
// res.send(userData);
res.redirect('http://localhost:8080/#/dashboard');
// console.log(userData);
});

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});


var server = app.listen(8081, function () {
  console.log('Login app listening at http://%s:%s',
    server.address().address, server.address().port);
});
