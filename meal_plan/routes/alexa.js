var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {

});

router.post('/mealPlan', function (req, res) {//TODO use correct column with ask id in it
    var slots = req.body.request.intent.slots;
    
    var activity = slots.activityLevel.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    var dj = 'amzn1.account.AHXJQ4ZJZJVKHXANAZEAZCMDRV5A';
    console.log(slots);
    var goal, activity;
    if (slots.weightGoal.value == "lose weight") {
        goal = "loss"
    }else if (slots.weightGoal.value == "gain weight") {
        goal = "gain"
    } else {
        goal = "maintain"
    }
    
    db.getConnection(function (err, mclient) {
        console.log(req.body);
        mclient.query('Update userData SET dietType = "' + goal + '", activityLevel="' + activity + '" WHERE UserID="' + dj + '"', function (err, rows, fields) {
          if (err) throw err;
          console.log("Changed diet type of " + dj + " to " + slots.weightGoal.value + " ");
          res.send(true);
        });
    });
});

router.post('/account', function (req, res) {
    var slots = req.body.request.intent.slots;
    var user = req.body.session.user.userId;
    var activity = slots.activityLevel.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    var dj = 'amzn1.account.AHXJQ4ZJZJVKHXANAZEAZCMDRV5A';
    db.getConnection(function (err, mclient) {
      mclient.query('SELECT new FROM amazonAuth WHERE amazonAuth.id = "' + dj + '"', function (err, rows, fields) {
        //  mclient.release();
        if (err) throw err;
        if (rows[0].new == 0) { //TODO need to make a dialouge for alllergies aand activity level here 
          mclient.query('INSERT INTO userData(UserID, gender, height, weight, age, activityLevel, allergies) VALUES ("' + dj + '", "' + slots.gender.value + '", "' + slots.height.value + '", "' + slots.currentWeight.value + '", "' + slots.age.value + '", "' + activity + '", "' + slots.allergies.value + '")', function (err, rows, fields) {
            // mclient.release();
            if (err) throw err;
            console.log("Added survey information for: " + user);
  
          });
        } else if (rows[0].new == 1) {
          mclient.query('UPDATE userData SET gender="' + slots.gender.value + '", height="' + slots.height.value + '", weight="' + slots.currentWeight.value + '", `age`="' + slots.age.value + '", activityLevel="' + activity + '", allergies="' + slots.allergies.value + '" WHERE UserID="' + dj + '"', function (err, rows, fields) {
            // mclient.release();
            if (err) throw err;
            console.log("Updated survey information for: " + user);
          });
        }
        mclient.query('INSERT INTO meals (UserID, meal1, meal2, meal3) VALUES ("' + dj + '", 0, 0, 0) ON DUPLICATE KEY UPDATE meals.UserID = meals.UserID', function (err, rows, fields) {
  
          if (err) throw err;
          console.log("Created meal space for: " + req.user.id);
        });
        mclient.release();
      });
  
    });
    db.getConnection(function (err, mclient) {
      mclient.query('Update amazonAuth SET new = 1 WHERE id="' + dj + '"', function (err, rows, fields) {
        mclient.release();
        if (err) throw err;
      });
    });
    res.send(true);
  
  });

module.exports = router