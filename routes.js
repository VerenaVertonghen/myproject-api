module.exports = function(app, passport) {
	
	// load routes
	var IndexRoute          = require('./app/routes/index');
	var UserRoute           = require('./app/routes/users'); 
	var NotificationRoute   = require('./app/routes/notifications');
	var StateRoute          = require('./app/routes/states');
	var CategoryRoute       = require('./app/routes/categories');
	var mongoose = require('mongoose');
	var User = require('./app/models/user.js');
	var passport = require('passport');
	var express = require('express');
	var router = express.Router();
	// use routes
	app.use('/', IndexRoute);
	app.use('/users', UserRoute);
	app.use('/notifications', NotificationRoute);
	app.use('/states', StateRoute);
	app.use('/categories', CategoryRoute);


	
	app
	/* USER
	-------------------------------------*/
	// view your profile (accessed at PUT http://localhost:8080/users/:id)
	.get('/myprofile', passport.authenticate('basic', { session: false}),
	function(req, res, next) {
		User.findById(req.user.id,{}).populate('states').exec(function (err, post) {
			if (err) return next(err);
			res.json(post);  
		});
	})

	// update your profile (accessed at PUT http://localhost:8080/users/:id)
	.put('/updateprofile', passport.authenticate('basic', { session: false}),
	function(req, res, next) {
		User.findByIdAndUpdate(req.user.id, req.body, function (err, post) {
		  if (err) return next(err);
		  res.json(post);
		  //res.json({ message: 'User updated!' });
		});
	})

	// delete a user (accessed at DELETE http://localhost:8080/users/:id)
	.delete('/deleteprofile', passport.authenticate('basic', { session: false}),
	function(req, res, next) {
		User.findByIdAndRemove(req.user.id, req.body, function (err, post) {
		  if (err) return next(err);
		  res.json(post);
		  //res.json({ message: 'User deleted!' });
		});
	})

	// create a user (accessed at POST http://localhost:8080/users)
	.post('/signup', function(req, res, next) {
		User.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
		//res.json({ message: 'User created!' });
		});
	});

	/* USER
	-------------------------------------*/

	// app.get('/logout', function(req, res) {
	// 	req.logout();
	// 	res.redirect('/');
	// });

	// // process the login form
 //    app.post('/login', passport.authenticate('local-login', {
 //        successRedirect : '/users', // redirect to the secure profile section
 //        failureRedirect : '/fail', // redirect back to the signup page if there is an error
 //    }));

};

// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on 
//     if (req.isAuthenticated())
//     	return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }