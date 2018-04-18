import React from 'react'
import ReactDOM from 'react-dom'
import { Divider, Container, Card, Icon, Image, Grid, Segment, Button } from 'semantic-ui-react'
import NavBar from './navBar.jsx';
import axios from 'axios';

class View extends React.Component 
{

  constructor(props)
  {
    super(props);
    this.state = {
      breakfast: "",
      lunch: "",
      dinner: ""
    }
  }

  componentDidMount() {
    var _this = this;
axios.post('/generateMealPlan/generate')
.then(function(response)
{
 console.log(response);
 _this.setState({
  breakfast: response.data.breakfast,
  lunch: response.data.lunch,
  dinner: response.data.dinner
});
//  callback(response);
//  console.log("BMR: "+ calories);
    console.log("Breakfast: " + response.data.breakfast.name);
   console.log("Lunch: " + response.data.lunch.name);
   console.log("Dinner: " + response.data.dinner.name);
  //  $('#test1').response.data.breakfast.name;
// return calories;
});
  }
// not sure exactly how to use axios properly to display
// but a response is recieved with required data...

// function callback(call)
// {
//   var cal = call;
//   console.log(cal.data);
//   var calories = cal.data.calories;
//   return cal.data.calories;
// }

render () {
  const breakfast = this.state.breakfast;
  const lunch = this.state.lunch;
  const dinner = this.state.dinner;
return (
  
  <Container fluid>
    <NavBar></NavBar>
    <Grid divided='vertically' centered>
      <Grid.Row columns={3} >
        <Grid.Column>
          <Container className="dashPanel" >
          {/* I have 3 different divider styles */}
        
            <Segment>
             Meal: {breakfast.name}
             <Divider hidden />
            Protein: {breakfast.Protein} grams
            <Divider hidden />
             Fat: {breakfast.Fat} grams
             <Divider hidden />
             Carbs: {breakfast.Carbs} grams
             <Divider hidden />
            Calories: {breakfast.Calories}
             <Divider hidden />
             Ingredients: {breakfast.Ingredients}
             </Segment>
          </Container>

        </Grid.Column>

        <Grid.Column>
          <Container className="dashPanel" >
          <Segment>
             Meal: {lunch.name}
             <Divider fitted />
            Protein: {lunch.Protein} grams
            <Divider fitted />
             Fat: {lunch.Fat} grams
             <Divider fitted />
             Carbs: {lunch.Carbs} grams
             <Divider fitted />
            Calories: {lunch.Calories}
             <Divider fitted />
             Ingredients: {lunch.Ingredients}
             </Segment>
          </Container>
        </Grid.Column>

        <Grid.Column>
          <Container className="dashPanel" >
          <Segment>
             Meal: {dinner.name}
             <Divider section />
            Protein: {dinner.Protein} grams
            <Divider section />
             Fat: {dinner.Fat} grams
             <Divider section />
             Carbs: {dinner.Carbs} grams
             <Divider section />
            Calories: {dinner.Calories}
             <Divider section />
             Ingredients: {dinner.Ingredients}
             </Segment>
            </Container>
        </Grid.Column>

      </Grid.Row>
    </Grid>
  </Container>

)
}
}
ReactDOM.render(<View />, document.getElementById('dashboard'));
