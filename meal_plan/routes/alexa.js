var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {

});

router.post('/test', function (req, res, next) {
    console.log(req.body);
})

module.exports = router