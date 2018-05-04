var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {

});

router.post('/mealPlan', function (req, res, next) {
    var slots = req.body.request.intent.slots;
    var user = req.body.session.user.userId;
    console.log(slots);
    var goal, activity;
    if (slots.weightGoal.value == "weight loss") {
        goal = "loss"
    }else if (slots.weightGoal.value == "weight gain") {
        goal = "gain"
    } else {
        goal = "maintain"
    }
    activity = 1.37
    db.getConnection(function (err, mclient) {
        console.log(req.body);
        mclient.query('Update userData SET dietType = "' + goal + '", activityLevel="' + activity + '" WHERE UserID="' + req.body.session.user.userId + '"', function (err, rows, fields) {
          if (err) throw err;
          console.log("Changed diet type of " + user + " to " + slots.weightGoal.value + " ");
          res.redirect('/viewMealPlan');
        });
    });
});

router.post('/account', function (req, res) {
    var slots = req.body.request.intent.slots;
    var user = req.body.session.user.userId;
    db.getConnection(function (err, mclient) {
      mclient.query('SELECT new FROM amazonAuth WHERE amazonAuth.id = "' + user + '"', function (err, rows, fields) {
        //  mclient.release();
        if (err) throw err;
        if (rows[0].new == 0) {
          mclient.query('INSERT INTO userData(UserID, gender, height, weight, age, activityLevel, allergies) VALUES ("' + req.user.id + '", "' + req.body.gender + '", "' + calcHeight(req.body.height) + '", "' + req.body.weight + '", "' + req.body.age + '", "' + req.body.activityLevel + '", "' + req.body.allergies + '")', function (err, rows, fields) {
            // mclient.release();
            if (err) throw err;
            console.log("Added survey information for: " + req.user.id);
  
          });
        } else if (rows[0].new == 1) {
          mclient.query('UPDATE userData SET gender="' + req.body.gender + '", height="' + calcHeight(req.body.height) + '", weight="' + req.body.weight + '", `age`="' + req.body.age + '", activityLevel="' + req.body.activityLevel + '", allergies="' + req.body.allergies + '" WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
            // mclient.release();
            if (err) throw err;
            console.log("Updated survey information for: " + req.user.id);
          });
        }
        mclient.query('INSERT INTO meals (UserID, meal1, meal2, meal3) VALUES ("' + req.user.id + '", 0, 0, 0) ON DUPLICATE KEY UPDATE meals.UserID = meals.UserID', function (err, rows, fields) {
  
          if (err) throw err;
          console.log("Created meal space for: " + req.user.id);
        });
        mclient.release();
      });
  
    });
    db.getConnection(function (err, mclient) {
  
  
      mclient.query('Update amazonAuth SET new = 1 WHERE id="' + req.user.id + '"', function (err, rows, fields) {
        mclient.release();
        if (err) throw err;
      });
    });
  
  
  });

module.exports = router