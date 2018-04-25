var express = require('express');
var router = express.Router();
var db = require('./db.js');
var gmp = require('./generateMealPlan.js');

router.get('/', function (req, res, next) {
    res.render('view-meal-plan', {});
});

router.post('/view', function (req, res) {
    db.getConnection(function (err, mclient) {
      // random = Math.floor(Math.random() * 3); //selects between current 3 meals
      mclient.query('SELECT * FROM meals WHERE UserID = "'+req.user.id+'"', function (err, rows, fields) {
        if (err) throw err;
        console.log(rows[0]);
        meal1 = rows[0].meal1;
        meal2 = rows[0].meal2;
        meal3 = rows[0].meal3;
        console.log("reach here");
        //    res.send({meals: rows[0]});
           mclient.query('SELECT * FROM mealplan_breakfast', function (err, brk, fields) {
            if (err) throw err;
            // console.log(brk[random]);
            mclient.query('SELECT * FROM mealplan_lunch', function (err, lun, fields) {
              if (err) throw err;
              // console.log(lun[random]);
              mclient.query('SELECT * FROM mealplan_dinner;', function (err, din, fields) {
                mclient.release();
               if (err) throw err;
              //  console.log(din[meal1]);
               res.send({
                breakfast: brk[meal1],
                lunch: lun[meal2],
                dinner: din[meal3]});
           });
          });
          });
      });
  });
  });

module.exports = router