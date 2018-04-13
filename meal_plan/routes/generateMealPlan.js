var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log('the route works');
  });

  module.exports = router