// on routes that end in /notifications
// ----------------------------------------------------

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var Notification = require('../models/notification.js');

router
	// get all the notifications (accessed at GET http://localhost:8080/notifications)
	.get('/', passport.authenticate('basic', { session: false}),
    function(req, res, next) {
     Notification.find(function (err, notifications) {
       if (err) return next(err);
       res.json(notifications);
     });
   })

    // create a notification (accessed at POST http://localhost:8080/notifications)
    .post('/', passport.authenticate('basic', { session: false}),
      function(req, res, next) {
        if(req.user.role == "admin"){

          Notification.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
          }   
           ); 
        }
        else{
          return res.send('You are not allowed to create a notification.');
        }
       
      })

    // get a notification (accessed at GET http://localhost:8080/notifications/:id)
    .get('/:id', passport.authenticate('basic', { session: false}),
      function(req, res, next) {
        Notification.findById(req.params.id, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      })

    // update a notification (accessed at PUT http://localhost:8080/notifications/:id)
    .put('/:id', passport.authenticate('basic', { session: false}),
      function(req, res, next) {
        Notification.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
          if (err) return next(err);
          res.json(post);
        //res.json({ message: 'Notification updated!' });
      });
      })

    // delete a notification (accessed at DELETE http://localhost:8080/notifications/:id)
    router.delete('/:id', passport.authenticate('basic', { session: false}),
      function(req, res, next) {
        Notification.findByIdAndRemove(req.params.id, req.body, function (err, post) {
          if (err) return next(err);
          res.json(post);
        //res.json({ message: 'Notification deleted!' });
      });
      });

    module.exports = router;