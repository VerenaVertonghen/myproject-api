// on routes that end in /categories
// ----------------------------------------------------

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var Category = require('../models/category.js');

router
	// get all the categories (accessed at GET http://localhost:8080/categories)
	.get('/', passport.authenticate('basic', { session: false}),
  function(req, res, next) {
	  Category.find(function (err, categories) {
	    if (err) return next(err);
	    res.json(categories);
	  });
	})

    // create a category (accessed at POST http://localhost:8080/categories)
    .post('/', passport.authenticate('basic', { session: false}),
    function(req, res, next) {
      Category.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
        //res.json({ message: 'Category created!' });
      });
    })

    // get a category (accessed at GET http://localhost:8080/categories/:id)
    .get('/:id', passport.authenticate('basic', { session: false}),
    function(req, res, next) {
      Category.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    })

    // update a category (accessed at PUT http://localhost:8080/categories/:id)
    .put('/:id', passport.authenticate('basic', { session: false}),
    function(req, res, next) {
      Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
        //res.json({ message: 'Category updated!' });
      });
    })

    // delete a category (accessed at DELETE http://localhost:8080/categories/:id)
    router.delete('/:id', passport.authenticate('basic', { session: false}),
    function(req, res, next) {
      Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
        //res.json({ message: 'Category deleted!' });
      });
    });
	
module.exports = router;