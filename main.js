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

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    next();
}

// app.configure(function() {
//     // app.use(express.bodyParser());
//     // app.use(express.cookieParser());
//     // app.use(express.session({ secret: 'cool beans' }));
//     // app.use(express.methodOverride());
//     app.use(allowCrossDomain);
//     // app.use(app.router);
// });

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.use(allowCrossDomain);
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
app.use(require('./app/routes/cors'));

// START THE SERVER
// =============================================================================
 
	//localhost
	// =============================================================================
	// app.listen(port);
	// console.log('Magic happens on port ' + port);

	//bluemix
	// =============================================================================
	app.listen(appEnv.port, appEnv.bind, function() {
		// print a message when the server starts listening
  		console.log("server starting on " + appEnv.url);
	});