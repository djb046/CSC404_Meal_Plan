var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {
    res.render('userinfo', {});
});

module.exports = router
// branch