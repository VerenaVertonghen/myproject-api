// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {  // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // // used to serialize the user for the session
    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    // });

    // // used to deserialize the user
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         done(err, user);
    //     });
    // });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use('local-login', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with email
    //     usernameField : 'email',
    //     passwordField : 'password',
    //     passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, email, password, done) { // callback with email and password from our form
    //     console.log(email);
    //     console.log(password);
    //     // find a user whose email is the same as the forms email
    //     // we are checking to see if the user trying to login already exists
    //     User.findOne({ 'email' :  email }, function(err, user) {
    //         // if there are any errors, return the error before anything else
    //         console.log('foundone!');
    //         if (err){
    //             console.log('error occurred');
    //             return done(err);
    //         }
    //         // if no user is found, return the message
    //         if (!user){
    //             console.log('no user found');
    //             return done(null, false); // req.flash is the way to set flashdata using connect-flash
    //         }
    //         // if the user is found but the password is wrong
    //         if (!user.validPassword(password)){
    //             console.log('password not correct');
    //             return done(null, false); // create the loginMessage and save it to session as flashdata
    //         }
    //         // all is well, return successful user
    //         return done(null, user);

    //     });

    // }));

passport.use(new BasicStrategy(
    function(email, password, done) {
        console.log('email address is: ' + email);
        console.log('password is: ' + password);
        
        User.findOne({ 'email': email }, function (err, user) {
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
    }

    ));
};


