var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {
    res.render('editSurv', {});
  });

  router.post('/info', function (req, res) {
    db.getConnection(function (err, mclient) {
      mclient.query('Select * FROM userData WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
        mclient.release();
        if (err) throw err;
        weight = rows[0].weight;
        height = rows[0].height;
        age = rows[0].age;
        gender = rows[0].gender;
        activityLevel = rows[0].activityLevel;
        dietType = rows[0].dietType;
  
        console.log(rows);
        res.send({
          weight: rows[0].weight,
          height: rows[0].height,
          age: rows[0].age,
          gender: rows[0].gender,
          activityLevel: rows[0].activityLevel,
          dietType: rows[0].dietType
        });
      })
    })
  });
  
  module.exports = router