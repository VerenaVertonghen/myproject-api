// config/passport.js
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
// load up the user model
var User = require('../app/models/user');
// expose this function to our app using module.exports
module.exports = function(passport) {
    passport.use(new BasicStrategy(function(email, password, done) {
        //console.log('email address is: ' + email);
        //console.log('password is: ' + password);
        User.findOne({
            'email': email
        }, function(err, user) {
            if (err) {
                console.log("shit has gone down");
                return done(err);
            }
            if (!user) {
                console.log("no user was found");
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                console.log("password invalid");
                return done(null, false);
            }
            return done(null, user);
        });
    }));
};