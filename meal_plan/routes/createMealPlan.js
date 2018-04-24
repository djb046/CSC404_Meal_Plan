var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {
    res.render('create-meal-plan', {});
});

module.exports = router

// branch