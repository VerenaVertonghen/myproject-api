module.exports = function(app, passport) {
	
	// load routes
	var IndexRoute          = require('./app/routes/index');
	var UserRoute           = require('./app/routes/users'); 
	var NotificationRoute   = require('./app/routes/notifications');
	var StateRoute          = require('./app/routes/states');
	var CategoryRoute       = require('./app/routes/categories');
	var mongoose = require('mongoose');

	var User = require('./app/models/user.js');
	var State = require('./app/models/state.js');
	
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
	// change languagesetting
	// change notificationsetting
	// change themesetting
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
	})

	/* STATE
	-------------------------------------*/
	// submit a state
	.post('/submitstate', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			User.findById(req.user.id,{}).exec(function (err, user) {
				if (err) return next(err);
				user.states.push(req.body.state);
				user.save(function (err) {
					if (err) return next(err);
					res.json(user);
				}); 

			});
		})



	// get all your states (accessed at GET http://localhost:8080/states)
	.get('/mystates', passport.authenticate('basic', {
		session: false
	}), function(req, res, next) {
		User.findById(req.user.id,{}).populate('states').exec(function (err, post) {
			if (err) return next(err);
			res.json(post.states);  
		});
	});

	/* NOTIFICATION
	-------------------------------------*/
	// receive notification ?

};