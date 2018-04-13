var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {
  res.render('surv', {});
});

router.post('/submit', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('INSERT INTO userData(UserID, gender, height, weight, age, activityLevel, allergies) VALUES ("' + req.user.id + '", "' + req.body.gender + '", "' + req.body.height + '", "' + req.body.weight + '", "' + req.body.age + '", "' + req.body.activityLevel + '", "' + req.body.allergies + '")', function (err, rows, fields) {
      mclient.release();
      if (err) throw err;
      console.log("Added survey information for: " + req.user.id);
    });

  });
  db.getConnection(function (err, mclient) {
    mclient.query('Update amazonAuth SET new = 1 WHERE id="' + req.user.id + '"', function (err, rows, fields) {
      mclient.release();
      if (err) throw err;
      console.log("Updated " + req.user.id + " to old member");
      
    });

  });

})
module.exports = router