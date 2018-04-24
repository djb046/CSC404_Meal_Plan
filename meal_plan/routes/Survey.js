var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {
  res.render('surv', {});
});

router.post('/submit', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('INSERT INTO userData(UserID, gender, height, weight, age, activityLevel, allergies) VALUES ("' + req.user.id + '", "' + req.body.gender + '", "' + calcHeight(req.body.height) + '", "' + req.body.weight + '", "' + req.body.age + '", "' + req.body.activityLevel + '", "' + req.body.allergies + '")', function (err, rows, fields) {
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
      res.redirect('/dashboard');
    });
  });
  
// branch
})

function calcHeight(f)
{
  var rex = /^(\d+)'(\d+)(?:''|")$/;
  var match = rex.exec(f);
  var feet, inch, total;
  if (match) {
    feet = parseInt(match[1], 10);
    inch = parseInt(match[2], 10);
    total = (feet*12) + inch;
    console.log(total);
    return total;
  }
}
module.exports = router