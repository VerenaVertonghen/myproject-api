// on routes that end in /notifications
// ----------------------------------------------------
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Notification = require('../models/notification.js');

router
    /*ADMIN*/
    // get all the notifications (accessed at GET http://localhost:8080/notifications)
    .get('/', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Notification.find(function(err, notifications) {
                if (err) return next(err);
                res.json(notifications);
            });
        } else {
            return res.send(
                'You are not allowed to get all the notifications.');
        }
    })
    /*ADMIN*/
    // create a notification (accessed at POST http://localhost:8080/notifications)
    .post('/', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Notification.create(req.body, function(err, post) {
                if (err) return next(err);
                res.json(post);
            });
        } else {
            return res.send('You are not allowed to create a notification.');
        }
    })
    /*ADMIN*/
    // get a notification (accessed at GET http://localhost:8080/notifications/:id)
    .get('/:id', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Notification.findById(req.params.id, function(err, post) {
                if (err) return next(err);
                res.json(post);
            });
        } else {
            return res.send('You are not allowed to get a notification.');
        }
    })
    /*ADMIN*/
    // update a notification (accessed at PUT http://localhost:8080/notifications/:id)
    .put('/:id', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Notification.findByIdAndUpdate(req.params.id, req.body,
                function(err, post) {
                    if (err) return next(err);
                    res.json(post);
                });
        } else {
            return res.send('You are not allowed to update a notification.');
        }
    })
    /*ADMIN*/
    // delete a notification (accessed at DELETE http://localhost:8080/notifications/:id)
    .delete('/:id', passport.authenticate('basic', {
        session: false
    }), function(req, res, next) {
        if (req.user.role == "admin") {
            Notification.findByIdAndRemove(req.params.id, req.body,
                function(err, post) {
                    if (err) return next(err);
                    res.json(post);
                });
        } else {
            return res.send('You are not allowed to delete a notification.');
        }
    });
module.exports = router;