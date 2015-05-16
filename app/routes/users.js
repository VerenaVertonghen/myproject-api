// on routes that end in /users
// ----------------------------------------------------

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var passport = require('passport');

router
	// get all the users (accessed at GET http://localhost:8080/users)
	.get('/', passport.authenticate('basic', { session: false}), 
  function(req, res, next) {
     User.find({}).populate('states').exec(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
   })

	// create a user (accessed at POST http://localhost:8080/users)
  .post('/', function(req, res, next) {
    User.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
        //res.json({ message: 'User created!' });
      });
  })

  // get a user (accessed at GET http://localhost:8080/users/:id)
  .get('/:id', passport.authenticate('basic', { session: false}),
  function(req, res, next) {
    User.findById(req.params.id,{}).populate('states').exec(function (err, post) {
      if (err) return next(err);
      res.json(post);  
    });
  })


  // update a user (accessed at PUT http://localhost:8080/users/:id)
  .put('/:id', passport.authenticate('basic', { session: false}),
  function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
      //res.json({ message: 'User updated!' });
    });
  })

  // delete a user (accessed at DELETE http://localhost:8080/users/:id)
  .delete('/:id', passport.authenticate('basic', { session: false}),
  function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
      //res.json({ message: 'User deleted!' });
    });
  });

module.exports = router;