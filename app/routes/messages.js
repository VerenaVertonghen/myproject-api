// on routes that end in /messages
// ----------------------------------------------------
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Message = require('../models/message.js');

router
    /*ADMIN*/
    // get all the messages (accessed at GET http://localhost:8080/messages)
    .get('/', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Message.find({}).exec(function(err, messages) {
                if (err) return next(err);
                res.json(messages);
            });
        } else {
            return res.status(403).send('You are not allowed to get all the messages.');
        }
    })
    /*ADMIN*/
    // create a message (accessed at POST http://localhost:8080/messages)
    .post('/', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Message.create(req.body, function(err, post) {
                if (err) return next(err);
                res.json(post);
            });
        } else {
            return res.status(403).send('You are not allowed to create a message.');
        }
    })
    /*USER*/
    // get a message (accessed at GET http://localhost:8080/messages/:id)
    .get('/:id', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        Message.findById(req.params.id, {}).populate('category').exec(
            function(err, post) {
            if (err) return next(err);
            res.json(post);
        });
    })
    /*ADMIN*/
    // update a message (accessed at PUT http://localhost:8080/messages/:id)
    .put('/:id', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Message.findByIdAndUpdate(req.params.id, req.body,
                function(err, post) {
                    if (err) return next(err);
                    res.json(post);
                });
        } else {
            return res.status(403).send('You are not allowed to update a message.');
        }
    })
    /*ADMIN*/
    // delete a message (accessed at DELETE http://localhost:8080/messages/:id)
    .delete('/:id', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Message.findByIdAndRemove(req.params.id, req.body,
                function(err, post) {
                    if (err) return next(err);
                    res.json(post);
                });
        } else {
            return res.status(403).send('You are not allowed to delete a message.');
        }
    });
module.exports = router;