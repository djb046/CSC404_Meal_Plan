var express = require('express');
var router = express.Router();
var db = require('./db.js');
var gmp = require('./generateMealPlan.js');

router.get('/', function (req, res, next) {
    res.render('view-meal-plan', {});
});

router.post('/delete/breakfast', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal1=0 WHERE UserID= "'+req.user.id+'"', function (err, rows, fields) {
      if (err) throw err;
      console.log("Deleted breakfast for " + req.user.id);
      res.redirect('/viewMealPlan');
    });
  });
});

router.post('/delete/lunch', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal2=0 WHERE UserID= "'+req.user.id+'"', function (err, rows, fields) {
      if (err) throw err;
      console.log("Deleted lunch for " + req.user.id);
      res.redirect('/viewMealPlan');
    });
  });
});

router.post('/delete/dinner', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal3=0 WHERE UserID= "'+req.user.id+'"', function (err, rows, fields) {
      if (err) throw err;
      console.log("Deleted dinner for " + req.user.id);
      res.redirect('/viewMealPlan');
    });
  });
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
        calculatedbmr = rows[0].calculatedbmr;
        currentcalories = rows[0].currentcalories;
        caloriesburned = rows[0].caloriesburned;
        name = req.user.displayName;
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
                dinner: din[meal3],
                calculatedbmr: calculatedbmr,
                currentcalories: currentcalories,
                name: name,
                caloriesburned: caloriesburned});
           });
          });
          });
      });
  });
  });

module.exports = router