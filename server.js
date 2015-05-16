// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
var port = process.env.PORT || 8080; // set our port
var mongoose = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({
    secret: 'thisisnotthesecretyouarelookingfor',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

mongoose.connect(configDB.url, function(err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

require('./config/passport')(passport); // pass passport for configuration
require('./routes.js')(app, passport);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);