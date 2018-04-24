<<<<<<< HEAD
// import React from 'react';
//ENTRANCE SURVEY
//By Dylan Campbell

//This is the Entrance survey that will request information specific to our app from the user after
//the initial creation of their account via Amazon Passport or such. 

export default class Survey extends React.Component {
	//default state with empty values
	state = {
		gender: '',
		height: '',
		weight: '',
		age: '',
		activityLevel: '',
		allergies: '',
	}
	//Updates the state values for the given event submission
	change = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	//Submit the current state. Will be used to handle passing the data to another component and/or redirection.
	onSubmit = (event) => {
		event.preventDefault();
		console.log(this.state); //For testing
	}

	render(){
		return(
			<form>

				{/*TODO: Form Validation*/}
				<h1>Registration Survey</h1>
				<h4>Gender</h4> {/*Gender field using a dropdown menu.*/}
				<select 
				name = "gender"
				value={this.state.gender} 
				onChange={event => this.change(event)} 
				>
					<option value="" disabled selected> -- select an option -- </option>
					<option value="male">male</option>
					<option value="female">female</option>
					<option value="other">other</option>

				</select>
				<br />

				<h4>Height</h4> {/*Height field using an input field.*/}
				<input 
				name = "height"
				placeholder="#'# (feet'inches)"
				value={this.state.firstName} 
				onChange={event => this.change(event)}
				 
				/>
				<br />

				<h4>Weight</h4> {/*Weight field using an input field.*/}
				<input 
				name = "weight"
				placeholder='### (in lbs)' 
				value={this.state.firstName} 
				onChange={event => this.change(event)} 
				/>
				<br />

				<h4>Age</h4> {/*age field using an input field.*/}
				<input 
				name = "age"
				placeholder='In years' 
				value={this.state.firstName} 
				onChange={event => this.change(event)} 
				/>
				<br />

				<h4>Level of Activity</h4> {/*Activity level field using a dropdown menu.*/}
				<select 
				name = "activityLevel" 
				value={this.state.firstName} 
				onChange={event => this.change(event)} 
				>
					<option value="" disabled selected> -- select an option -- </option>
					<option value="sedentary">sedentary</option>
					<option value="moderate">moderate</option>
					<option value="high">high</option>
				</select>
				<br />

				<h4>Allergies</h4> {/*Allergies field using an input field.*/}
				<input 
				name = "allergies"
				placeholder='allergies' 
				value={this.state.firstName} 
				onChange={event => this.change(event)} 
				/>
				<br /><br />


				{/*Submit form*/}
				<button onClick={(event) => this.onSubmit(event)}>Submit</button>
			</form>
		);
	}
}
=======
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
>>>>>>> djBranchier
