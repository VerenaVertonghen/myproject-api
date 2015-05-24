module.exports = function(app, passport) {
	
	// load routes
	var IndexRoute          = require('./app/routes/index');
	var UserRoute           = require('./app/routes/users'); 
	var NotificationRoute   = require('./app/routes/notifications');
	var StateRoute          = require('./app/routes/states');
	var CategoryRoute       = require('./app/routes/categories');
	var mongoose 			= require('mongoose');
	var async = require('async')

	var Category = require('./app/models/category.js');
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
			console.log(req.body);
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
	.post('/addstatetouser', passport.authenticate('basic', { session: false}),
	function(req, res, next) {
		State.findById(req.body.state, function(err, post) {
			console.log('finding state', post);
			if (err) return next(err);

			User.findByIdAndUpdate(req.user.id, { $push: {"states": post._id}}, {  safe: true, upsert: true} , function (err, post) {
				if (err) return next(err);
				res.json(post);
			});
		});
	})

	// get all your states (accessed at GET http://localhost:8080/states)
	.get('/mystates', passport.authenticate('basic', {
		session: false
	}), function(req, res, next) {
		User.findById(req.user.id,{}).populate('states').populate('states.category').exec(function (err, user) {
			if (err) return next(err);
			var modifiedStates = [];
			async.forEach(user.states, function(state,callback) {
				console.log("modifying" + state);
				State.populate(
					state,
					{ "path": "category" },
					function(err,output) {
						if (err) {
							throw err;
						}
						console.log("pushing " + output);
						modifiedStates.push(output);
						callback();
					}
					);
			},function(err) {
				if (err) console.log( err );
				res.json(modifiedStates);
			});

		});
	});

	/* NOTIFICATION
	-------------------------------------*/
	// receive notification ?

};