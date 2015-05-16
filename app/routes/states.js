// on routes that end in /states
// ----------------------------------------------------

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var State = require('../models/state.js');

router
	// get all the states (accessed at GET http://localhost:8080/states)
	.get('/', passport.authenticate('basic', { session: false}),
  function(req, res, next) {
	  State.find(function (err, states) {
	    if (err) return next(err);
	    res.json(states);
	  });
	})

    // create a state (accessed at POST http://localhost:8080/states)
    .post('/', passport.authenticate('basic', { session: false}),
    function(req, res, next) {
      State.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
        //res.json({ message: 'State created!' });
      });
    })

    // get a state (accessed at GET http://localhost:8080/states/:id)
    .get('/:id', passport.authenticate('basic', { session: false}),
    function(req, res, next) {
      State.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    })

    // delete a state (accessed at DELETE http://localhost:8080/states/:id)
    router.delete('/:id', passport.authenticate('basic', { session: false}),
    function(req, res, next) {
      State.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
        //res.json({ message: 'State deleted!' });
      });
    });
	
module.exports = router;