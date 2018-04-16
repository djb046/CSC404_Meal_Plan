var express = require('express');
var router = express.Router();
var db = require('./db.js')


router.get('/', function (req, res, next) {
  res.render('generate-meal-plan', {});
});

router.post('/submit',function (req, res) {
  console.log(req.body);
  // req.body == { goal: 'Weight Loss', activityLevel: 'Lightly active' }
});

// Calories for user set up as two functions to sort of understand what we are doing with the values, 
//can be collpased later

//Calculate the BEE (Basal Energy Expenditure), 
//Generally this is how much a person will burn without any exercise

//if statments need to be replaced with proper ones, and the 1's within equation should be replaced.
function calculateBEE()
{
  var BEE = 0;
  if (0 == 0/*the user is a female use this equation*/) {
    return BEE = (655 + (4.35 * 1/* USER WEIGHT HERE */) + (4.7 * 1/* USER HEIGHT HERE  */) - (4.7 * 1/*USER AGE HERE (in years) */));

  }
  else if (0 == 1/*the user is a male use this equation*/) {
    return BEE = (66 + (6.23 * 1/* USER WEIGHT HERE */) + (12.7 * 1/* USER HEIGHT HERE  */) - (6.8 * 1/*USER AGE HERE (in years) */));
    //This is why we can not account for 'other'
  }
}


var BMR = 0
// Next we need the BMR, 
// essentially here we are trying to figure out the users total calorie loss potiential 'for the day'
// this will require us to incorperate the activity level of the user, every activity level has a 

//if statments need to be replaced with proper ones, and the 1's within equation should be replaced.
function calculateBMR()
{
  var activityLevel = 1.2; // might make this an int value to save within the database to make it easy
  var level = 0;
  if (0 == 0/*check the activity level*/) {
    level = level;
  } else if (0 == 1) {
    level = level + 1;
  } //continue this, might change to set a value once a activity level is selected during survey.
  // there are 5 levels of activity:

  // Sedentary (little or no exercise): BMR x 1.2
  //  Lightly active (light exercise/sports 1-3 days/week): BMR x 1.375
  //  Moderately active (moderate exercise/sports 3-5 days/week): BMR x 1.55
  //  Very active (hard exercise/sports 6-7 days a week): BMR x 1.725
  //  Extra active (very hard exercise/sports & physical job or 2x training): BMR x 1.9 

  // you can simply add 0.175 to each level to get the next. but if we set this up in the database instead
  // of the actual varchar value of the level we can quickly calculate the BMR

  activityLevel = activityLevel + (0.175 * level);
  return this.calculateBEE() * activityLevel;
}


var calorieIntake = 0;
var neededCalories = 0;
// after we have calculated the BMR we can move on to actual generation of meal plan, this will be based on diet
function generateMealPlan()
{
  // here we will let them decide, based on their diet type, we can take a quick survey of the current diet type
  // when they click generate a meal plan because this can change very regularly

  if (0 == 0 /* check if the diet type == maintainWeight*/) {
    // this means that they do not need to change amount of calories burn, so essentially calorieLoss = regular loss
    calorieIntake = this.calculateBMR();
  } else if (0 == 1 /*check if the diet type == weightGain*/) {
    // to gain weight we must add around 500 calories (this is a changing factor) to the intake amount
    // for this we will need to ask them again in the quick survey if this diet is selected how main pounds
    // are they trying to gain, normal (healthy) amount are 0.5lb (+250 calories) and 1lb (+500 calories) a week
    neededCalories = 500 /* 250 ?*/; //again we will check and change this value depending on amount loss
    calorieIntake = this.calculateBMR() + neededCalories;
  } else if (0 == 2)
  {
    // to lose weight we must subtract around 500 calories(this is a changing factor) to the intake amount
    // for this we will need to ask them again in the quick survey if this diet is selected how main pounds
    // are they trying to lose, normal (healthy) amount are 0.5lb (-250 calories) and 1lb (-500 calories) a week
    neededCalories = 250 /* 500 ?*/;
    calorieIntake = this.calculateBMR() - neededCalories;
  }

  // now we can call the calorieIntake value and essentially grab a meal/meals that are within this range for the
  // user

  // we can make calls to the database and check for the essential meal here this might be a little difficult
  // since we need to make a meal for the day in a sense, so we need to check with the nutritionist 
  // about what should be allocated for calories for breakfast, lunch, and dinner

  // also we need to check for allergies and account for this in some way, but that can be handled later
  // once we nail down the functionality of this.

}

router.post('/generate', function(req, res)
{
  db.getConnection(function (err, mclient) {
    mclient.query('SELECT * mealplan_breakfast', function (err, rows, fields) {
      mclient.release();
      if (err) throw err;
      console.log(rows[0]);
    });
  });
});

module.exports = router