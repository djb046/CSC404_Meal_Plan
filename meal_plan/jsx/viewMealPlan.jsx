import React from 'react'
import ReactDOM from 'react-dom'
import { Divider, Container, Card, Icon, Image, Grid, Segment, Button, Form } from 'semantic-ui-react'
import NavBar from './navBar.jsx';
import axios from 'axios';
// import NuteLabel from './nutxTest.jsx';

class View extends React.Component {

  constructor(props) {
    super(props);
    this.changeInput = this.changeInput.bind(this);
    this.submitBreakfest = this.submitBreakfest.bind(this);
    this.state = {
      breakfast: "",
      lunch: "",
      dinner: "",
      foodQuery: ''
    }
  }

  breakfast() {
    axios.post('/viewMealPlan/delete/breakfast')
      .then(function (response) {
        location.href = '/viewMealPlan';
      });
  }

  lunch() {
    axios.post('/viewMealPlan/delete/lunch')
      .then(function (response) {
        location.href = '/viewMealPlan';
      });
  }
  changeInput(e) {
    let id = e.target.id;
    let value = e.target.value;
    this.setState({
        [id]: value
    });
}

  dinner() {
    axios.post('/viewMealPlan/delete/dinner')
      .then(function (response) {
        location.href = '/viewMealPlan';
      });
  }

  componentDidMount() {
    var _this = this;
    axios.post('/viewMealPlan/view')
      .then(function (response) {
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
  submitBreakfest() {
    axios({
        method: 'post',
        headers: {
            "x-app-id": 'b5e0352f',
            "x-app-key": '9d811ca9f553eb1a1a121d026d19b094',
            "Content-Type": "application/json"
        },
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        data: {
            "query": this.state.foodQuery,
            "timezone": "US/Eastern"
        }
    }).then(function (res) {
        console.log(res);
        let food_name = '', nf_calories = 0, nf_total_fat = 0, nf_saturated_fat = 0, nf_cholesterol = 0, nf_sodium = 0, nf_total_carbohydrate = 0, nf_sugars = 0, nf_protein = 0;
        for(var i = 0; i < res.data.foods.length; i++) {
            food_name += res.data.foods[i].food_name + ', '
            nf_calories = nf_calories + res.data.foods[i].nf_calories
            nf_total_fat = nf_total_fat + res.data.foods[i].nf_total_fat
            nf_saturated_fat = nf_saturated_fat + res.data.foods[i].nf_saturated_fat
            nf_cholesterol = nf_cholesterol + res.data.foods[i].nf_cholesterol
            nf_sodium = nf_sodium + res.data.foods[i].nf_sodium
            nf_total_carbohydrate = nf_total_carbohydrate + res.data.foods[i].nf_total_carbohydrate
            nf_sugars = nf_sugars + res.data.foods[i].nf_sugars
            nf_protein = nf_protein + res.data.foods[i].nf_protein
        }
        let data = {
          foods: food_name,
          protein: nf_protein,
          Fat: nf_total_fat,
          Carbs: nf_total_carbohydrate,
          Calories: nf_calories

        }
        axios({
          method: 'post',
          headers: {
              "Content-Type": "application/json"
          },
          url: '/viewMealPlan/spec/breakfast',
          data: data
        }).then(function(res){
          location.href = '/viewMealPlan';
        });
        
    }).catch(function (error) {
        console.log(error);
    });

}

  render() {
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
                <div className="title">
                  <h1>Breakfast</h1>
                </div>
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
                <Button basic color='green' onClick={this.submitBreakfest} >Submit</Button>
                <Form.Group widths='equal'>
                        <Form.Input id='foodQuery' placeholder='whatcha eat?' onChange={this.changeInput} />
                    </Form.Group>
                

              </Container>

            </Grid.Column>

            <Grid.Column>
              <Container className="dashPanel" >
                <div className="title">
                  <h1>Lunch</h1>
                </div>
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
                <div className="title">
                  <h1>Dinner</h1>
                </div>
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
