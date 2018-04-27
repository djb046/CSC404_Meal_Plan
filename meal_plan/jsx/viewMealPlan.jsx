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

  breakfast()
  {
    axios.post('/viewMealPlan/delete/breakfast')
    .then(function(response)
    {
      location.href = '/viewMealPlan';
    });
  }

  lunch()
  {
    axios.post('/viewMealPlan/delete/lunch')
    .then(function(response)
    {
      location.href = '/viewMealPlan';
    });
  }

  dinner()
  {
    axios.post('/viewMealPlan/delete/dinner')
    .then(function(response)
    {
      location.href = '/viewMealPlan';
    });
  }

  componentDidMount() {
    var _this = this;
axios.post('/viewMealPlan/view')
.then(function(response)
{
 console.log(response);
 _this.setState({
  breakfast: response.data.breakfast,
  lunch: response.data.lunch,
  dinner: response.data.dinner
});
  console.log("Breakfast: " + response.data.breakfast.name);
  console.log("Lunch: " + response.data.lunch.name);
  console.log("Dinner: " + response.data.dinner.name);
});
  }

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
             <Divider section />
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
             <Button color='red' onClick={this.breakfast}> Remove Breakfast </Button>
          </Container>

        </Grid.Column>

        <Grid.Column>
          <Container className="dashPanel" >
          <Segment>
             Meal: {lunch.name}
             <Divider section />
            Protein: {lunch.Protein} grams
            <Divider hidden />
             Fat: {lunch.Fat} grams
             <Divider hidden />
             Carbs: {lunch.Carbs} grams
             <Divider hidden />
            Calories: {lunch.Calories}
             <Divider hidden />
             Ingredients: {lunch.Ingredients}
             </Segment>
             <Button color='red' onClick={this.lunch}> Remove Lunch </Button>
          </Container>
          
        </Grid.Column>

        <Grid.Column>
          <Container className="dashPanel" >
          <Segment>
             Meal: {dinner.name}
             <Divider section />
            Protein: {dinner.Protein} grams
            <Divider hidden />
             Fat: {dinner.Fat} grams
             <Divider hidden />
             Carbs: {dinner.Carbs} grams
             <Divider hidden />
            Calories: {dinner.Calories}
             <Divider hidden />
             Ingredients: {dinner.Ingredients}
             </Segment>
             <Button color='red' onClick={this.dinner}> Remove Dinner </Button>
            </Container>
        </Grid.Column>

      </Grid.Row>
    </Grid>
    
  </Container>

)
}
}
ReactDOM.render(<View />, document.getElementById('dashboard'));
