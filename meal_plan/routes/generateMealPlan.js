var express = require('express');
var router = express.Router();
var db = require('./db.js')

weight = 0;
height = 0;
age = 0;
gender = '';
activityLevel = 0;
BEE = 0;
dietType = '';
calorieIntake = 0;

router.post('/submit', function (req, res) {
  db.getConnection(function (err, mclient) {
    console.log(req.body);
    mclient.query('Update userData SET dietType = "' + req.body.goal + '", activityLevel="' + req.body.activityLevel + '" WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
      if (err) throw err;
      console.log("Changed diet type of " + req.user.id + " to " + req.body.goal + " ");
      res.redirect('/viewMealPlan');
    });
    mclient.query('Select * FROM userData WHERE UserID="' + req.user.id + '"', function (err, rows, fields) {
      mclient.release();
      if (err) throw err;
      weight = rows[0].weight;
      height = rows[0].height;
      age = rows[0].age;
      gender = rows[0].gender;
      activityLevel = rows[0].activityLevel;
      dietType = rows[0].dietType;
      console.log(calculateBEE());
      console.log(calculateBMR());
      console.log(generateMealPlan());
    });
  });
});



// Calories for user set up as two functions to sort of understand what we are doing with the values, 
//can be collpased later

//Calculate the BEE (Basal Energy Expenditure), 
//Generally this is how much a person will burn without any exercise

//if statments need to be replaced with proper ones, and the 1's within equation should be replaced.
function calculateBEE() {
  BEE = 0;
  if (gender == 'Female') { //case sensitive
    return BEE = (655 + (4.35 * weight) + (4.7 * height) - (4.7 * age));

  }
  else if (gender == 'Male') {//case sensitive
    return BEE = (66 + (6.23 * weight) + (12.7 * height) - (6.8 * age));
    //This is why we can not account for 'other'
  }
}


var BMR = 0
// Next we need the BMR, 
// essentially here we are trying to figure out the users total calorie loss potiential 'for the day'
// this will require us to incorperate the activity level of the user, every activity level has a 

//if statments need to be replaced with proper ones, and the 1's within equation should be replaced.

function calculateBMR() {

  // Sedentary (little or no exercise): BMR x 1.2
  //  Lightly active (light exercise/sports 1-3 days/week): BMR x 1.375
  //  Moderately active (moderate exercise/sports 3-5 days/week): BMR x 1.55
  //  Very active (hard exercise/sports 6-7 days a week): BMR x 1.725
  //  Extra active (very hard exercise/sports & physical job or 2x training): BMR x 1.9 

  // you can simply add 0.175 to each level to get the next. but if we set this up in the database instead
  // of the actual varchar value of the level we can quickly calculate the BMR

  return calculateBEE() * activityLevel;
}


neededCalories = 0;
// after we have calculated the BMR we can move on to actual generation of meal plan, this will be based on diet
function generateMealPlan() {
  // here we will let them decide, based on their diet type, we can take a quick survey of the current diet type
  // when they click generate a meal plan because this can change very regularly

  if (dietType == 'maintain' /* check if the diet type == maintainWeight*/) {
    // this means that they do not need to change amount of calories burn, so essentially calorieLoss = regular loss
    calorieIntake = calculateBMR();
  } else if (dietType == 'gain' /*check if the diet type == weightGain*/) {
    // to gain weight we must add around 500 calories (this is a changing factor) to the intake amount
    // for this we will need to ask them again in the quick survey if this diet is selected how main pounds
    // are they trying to gain, normal (healthy) amount are 0.5lb (+250 calories) and 1lb (+500 calories) a week
    neededCalories = 500 /* 250 ?*/; //again we will check and change this value depending on amount loss
    calorieIntake = calculateBMR() + neededCalories;
  } else if (dietType == 'loss') {
    // to lose weight we must subtract around 500 calories(this is a changing factor) to the intake amount
    // for this we will need to ask them again in the quick survey if this diet is selected how main pounds
    // are they trying to lose, normal (healthy) amount are 0.5lb (-250 calories) and 1lb (-500 calories) a week
    neededCalories = 250 /* 500 ?*/;
    calorieIntake = calculateBMR() - neededCalories;
  }

  // now we can call the calorieIntake value and essentially grab a meal/meals that are within this range for the
  // user

  // we can make calls to the database and check for the essential meal here this might be a little difficult
  // since we need to make a meal for the day in a sense, so we need to check with the nutritionist 
  // about what should be allocated for calories for breakfast, lunch, and dinner

  // also we need to check for allergies and account for this in some way, but that can be handled later
  // once we nail down the functionality of this.
  return calorieIntake;
}

router.post('/generate', function (req, res) {
  db.getConnection(function (err, mclient) {
    random = Math.floor(Math.random() * (3 - 1 + 1)) + 1; //selects between current 3 meals
    mclient.query('SELECT * FROM mealplan_breakfast', function (err, brk, fields) {
      if (err) throw err;
      console.log(brk[random]);
      mclient.query('SELECT * FROM mealplan_lunch', function (err, lun, fields) {
        if (err) throw err;
        console.log(lun[random]);
        mclient.query('SELECT * FROM mealplan_dinner;', function (err, din, fields) {
          
         if (err) throw err;
         console.log(din[random]);
         res.send({calories: generateMealPlan(),
          breakfast: brk[random],
          lunch: lun[random],
          dinner: din[random]});
          mclient.query('UPDATE meals SET meal1="'+random+'", meal2="'+random+'", meal3="'+random+'", calculatedbmr="'+calorieIntake+'" WHERE UserID="'+req.user.id+'"', function (err, din, fields) {
            mclient.release();
            if (err) throw err;
            console.log("Updated current meal plans for user: " + req.user.id);
          });
     });
    });
    });



});
});

module.exports = router