const express = require("express");
const app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var userData;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var session = require('express-session');
app.use(session({secret: "enter custom sessions secret here"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: '624380618870-aeqhpj00upevdkd66lo0bd06vor0vq4f.apps.googleusercontent.com',
  clientSecret: 'of-TGiusjrWmW6mO53bP10pd',
  callbackURL: 'http://localhost:8081/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {

  console.log(profile);
  return done(null, profile);
}
));

app.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
res.send(req.user);
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
