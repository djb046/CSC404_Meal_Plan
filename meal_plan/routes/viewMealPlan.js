var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/', function (req, res, next) {
  res.render('view-meal-plan', {});
});



router.post('/delete/breakfast', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal1=0 WHERE UserID= "' + req.user.id + '"', function (err, rows, fields) {
      if (err) throw err;
      console.log("Deleted breakfast for " + req.user.id);
      res.redirect('/viewMealPlan');
    });
  });
});

router.post('/delete/lunch', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal2=0 WHERE UserID= "' + req.user.id + '"', function (err, rows, fields) {
      if (err) throw err;
      console.log("Deleted lunch for " + req.user.id);
      res.redirect('/viewMealPlan');
    });
  });
});

router.post('/delete/dinner', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal3=0 WHERE UserID= "' + req.user.id + '"', function (err, rows, fields) {
      if (err) throw err;
      console.log("Deleted dinner for " + req.user.id);
      res.redirect('/viewMealPlan');
    });
  });
});
// ############
router.post('/add/breakfast', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal1c=1 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
      mclient.release();
      res.redirect('/dashboard');
      if (err) throw err;
    });
  });
});

router.post('/remove/breakfast', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal1c=0 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
      mclient.release();
      res.redirect('/dashboard');
      if (err) throw err;
    });
  });
});

router.post('/add/lunch', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal2c=1 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
      mclient.release();
      res.redirect('/dashboard');
      if (err) throw err;
    });
  });
});

router.post('/remove/lunch', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal2c=0 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
      mclient.release();
      res.redirect('/dashboard');
      if (err) throw err;
    });
  });
});
router.post('/add/dinner', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal3c=1 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
      mclient.release();
      res.redirect('/dashboard');
      if (err) throw err;
    });
  });
});

router.post('/remove/dinner', function (req, res) {
  db.getConnection(function (err, mclient) {
    mclient.query('UPDATE meals SET meal3c=0 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
      mclient.release();
      res.redirect('/dashboard');
      if (err) throw err;
    });
  });
});
// #############
router.post('/view', function (req, res) {
  db.getConnection(function (err, mclient) {
    // random = Math.floor(Math.random() * 3); //selects between current 3 meals
    mclient.query('SELECT * FROM meals WHERE UserID = "' + req.user.id + '"', function (err, rows, fields) {
      if (err) throw err;
      console.log(rows[0]);
      if (rows[0] == undefined) {
        mclient.query('INSERT INTO mealplan.meals (UserID, meal1, meal2, meal3, currentbee, currentbmr) VALUES ("' + req.user.id + '", 0, 0, 0, 0, 0)', function (err, rows, fields) {
          // mclient.release();
          if (err) throw err;
          console.log("Created meal space for: " + req.user.id);
          res.redirect('/dashboard');
        });
      }
      meal1 = rows[0].meal1;
      meal2 = rows[0].meal2;
      meal3 = rows[0].meal3;

      calculatedbmr = rows[0].calculatedbmr;
      currentcalories = rows[0].currentcalories;
      caloriesburned = rows[0].caloriesburned;
      meal1c = rows[0].meal1c;
      meal2c = rows[0].meal2c;
      meal3c = rows[0].meal3c;
      name = req.user.displayName;


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
            meal1calories = brk[meal1].Calories;
            meal2calories = lun[meal2].Calories;
            meal3calories = din[meal3].Calories;
            totalcalories = 0;
            // totalcalories = meal1calories + meal2calories + meal3calories;
            if (meal1c == 1) {
              totalcalories += meal1calories;
            }
            if (meal2c == 1) {
              totalcalories += meal2calories;
            }
            if (meal3c == 1) {
              totalcalories += meal3calories;
            }

            res.send({
              breakfast: brk[meal1],
              lunch: lun[meal2],
              dinner: din[meal3],
              calculatedbmr: calculatedbmr,
              currentcalories: currentcalories,
              name: name,
              caloriesburned: caloriesburned,
              meal1c: meal1c,
              meal2c: meal2c,
              meal3c: meal3c,
              totalcalories: totalcalories
            });
          });
        });
      });
    });
  });
});

router.post('/spec/breakfast', function (req, res) {
  // console.log(req.body);
  db.getConnection(function (err, mclient) {
    mclient.query('INSERT INTO mealplan_breakfast (name, Protein, Fat, Carbs, Calories) VALUES ("' + req.body.foods + '", "' + req.body.protein + '", "' + req.body.Fat + '", "' + req.body.Carbs + '", "' + req.body.Calories + '");', function (err, rows, fields) {
      // mclient.release();
      var something = 0;
      mclient.query('SELECT last_insert_id()', function (err, rows, fields) {
        console.log(rows[0]['last_insert_id()']);
        something = rows[0]['last_insert_id()'];
        mclient.query('UPDATE meals SET meal1="' + something + '", meal1c=0 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
          mclient.release();
        });
      });
      res.redirect('/viewMealPlan');
      if (err) throw err;
    });
  });
});


router.post('/spec/lunch', function (req, res) {
  // console.log(req.body);
  db.getConnection(function (err, mclient) {
    mclient.query('INSERT INTO mealplan_lunch (name, Protein, Fat, Carbs, Calories) VALUES ("' + req.body.foods + '", "' + req.body.protein + '", "' + req.body.Fat + '", "' + req.body.Carbs + '", "' + req.body.Calories + '");', function (err, rows, fields) {
      // mclient.release();
      var something = 0;
      mclient.query('SELECT last_insert_id()', function (err, rows, fields) {
        console.log(rows[0]['last_insert_id()']);
        something = rows[0]['last_insert_id()'];
        mclient.query('UPDATE meals SET meal2="' + something + '", meal2c=0 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
          mclient.release();
        });
      });
      res.redirect('/viewMealPlan');
      if (err) throw err;
    });
  });
});
router.post('/spec/dinner', function (req, res) {
  // console.log(req.body);
  db.getConnection(function (err, mclient) {
    mclient.query('INSERT INTO mealplan_dinner (name, Protein, Fat, Carbs, Calories) VALUES ("' + req.body.foods + '", "' + req.body.protein + '", "' + req.body.Fat + '", "' + req.body.Carbs + '", "' + req.body.Calories + '");', function (err, rows, fields) {
      // mclient.release();
      var something = 0;
      mclient.query('SELECT last_insert_id()', function (err, rows, fields) {
        console.log(rows[0]['last_insert_id()']);
        something = rows[0]['last_insert_id()'];
        mclient.query('UPDATE meals SET meal3="' + something + '", meal3c=0 WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
          mclient.release();
        });
      });
      res.redirect('/viewMealPlan');
      if (err) throw err;
    });
  });
});

module.exports = router