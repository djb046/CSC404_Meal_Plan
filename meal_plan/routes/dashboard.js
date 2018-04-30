var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {
    res.render('dashboard', {});
});

router.post('/test', function (req, res, next) {
    console.log("post was successful");
    console.log(req);
    res.send('yayayaya');
})

module.exports = router