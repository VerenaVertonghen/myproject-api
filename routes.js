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

	/* Specific routes
	-------------------------------------*/

	app
	/* USER
	-------------------------------------*/
	// view your profile (accessed at PUT http://localhost:8080/myprofile)
	.get('/myprofile', passport.authenticate('basic', { session: false}),
	function(req, res, next) {
		User.findById(req.user.id,{}).populate('states').exec(function (err, post) {
			if (err) return next(err);
			res.json(post);  
		});
	})

	// update your profile (accessed at PUT http://localhost:8080/updateprofile)
	.put('/updateprofile', passport.authenticate('basic', { session: false}),
	function(req, res, next) {
		User.findByIdAndUpdate(req.user.id, req.body, function (err, post) {
		  if (err) return next(err);
		  res.json(post);
		  //res.json({ message: 'User updated!' });
		});
	})

	// delete your profile (accessed at DELETE http://localhost:8080/deleteprofile)
	.delete('/deleteprofile', passport.authenticate('basic', { session: false}),
	function(req, res, next) {
		User.findByIdAndRemove(req.user.id, req.body, function (err, post) {
		  if (err) return next(err);
		  res.json(post);
		  //res.json({ message: 'User deleted!' });
		});
	})

	// signup (accessed at POST http://localhost:8080/signup)
	.post('/signup', function(req, res, next) {
		User.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
		//res.json({ message: 'User created!' });
		});
	});

	/* CATEGORY
	-------------------------------------*/
	// get all categories

	/* STATE
	-------------------------------------*/
	// post a status

	// get all states

	/* NOTIFICATION
	-------------------------------------*/
	// receive notification ?

	/* SETTINGS
	-------------------------------------*/
	// change languagesetting

	// change notificationsetting

	// change themesetting

};