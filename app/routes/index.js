// on routes that end in /
// ----------------------------------------------------

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Yay, welcome to the cosycare api!' });   
});

module.exports = router;