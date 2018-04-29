import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Grid, Card, Icon, Image, Menu, Progress, Item, Modal, Button, Header } from 'semantic-ui-react';
import Profile from './profile.jsx';
import NavBar from './navBar.jsx';
import axios from 'axios';
import Charts from './charts.jsx';

class Dashboard extends React.Component {
  constructor(props, context)
  {
    super(props, context);
    this.state = {
      meal1: "",
      meal2: "",
      meal3: "",
      calculatedbmr: 0,
      currentcalories: 0,
      caloriesburned: 0,
      name: "",
      meal1c: 0,
      meal2c: 0,
      meal3c: 0,
      totalcalories: 0,
      percent: 0,
      percent2: 0

    }
  }

  componentDidMount() {
  var _this = this;
  axios.post('/viewMealPlan/view')
.then(function(response)
{
 console.log(response);
 _this.setState({
  meal1: response.data.breakfast,
  meal2: response.data.lunch,
  meal3: response.data.dinner,
  calculatedbmr: response.data.calculatedbmr,
  currentcalories: response.data.currentcalories,
  caloriesburned: response.data.caloriesburned,
  name: response.data.name,
  meal1c: response.data.meal1c,
  meal2c: response.data.meal2c,
  meal3c: response.data.meal3c,
  totalcalories: response.data.totalcalories
  
});
console.log(response.data);
});
}

  breakfastadd() {
      axios.post('/viewMealPlan/add/breakfast')
        .then(function (response) {
           location.href = '/dashboard';
           console.log("clicked");
        });
  }

  breakfastdel(){
      axios.post('/viewMealPlan/remove/breakfast')
        .then(function (response) {
           location.href = '/dashboard';
          });
  }


  lunchadd() {
    axios.post('/viewMealPlan/add/lunch')
      .then(function (response) {
         location.href = '/dashboard';
         console.log("clicked");
      });
}

lunchdel(){
    axios.post('/viewMealPlan/remove/lunch')
      .then(function (response) {
         location.href = '/dashboard';
        });
}

dinneradd() {
  axios.post('/viewMealPlan/add/dinner')
    .then(function (response) {
       location.href = '/dashboard';
       console.log("clicked");
    });
}

dinnerdel(){
  axios.post('/viewMealPlan//remove/dinner')
    .then(function (response) {
       location.href = '/dashboard';
      });
}

  render() {
    const meal1 = this.state.meal1;
    const meal2 = this.state.meal2;
    const meal3 = this.state.meal3;
    const calculatedbmr = this.state.calculatedbmr;
    const currentcalories = this.state.currentcalories;
    const name = this.state.name;
    const caloriesburned = this.state.caloriesburned;
    const totalcal = meal1.Calories + meal2.Calories + meal3.Calories;
    const meal1c = this.state.meal1c;
    const meal2c = this.state.meal2c;
    const meal3c = this.state.meal3c;
    const totalcalories = this.state.totalcalories;
    return (
      <Container fluid>
        <NavBar></NavBar>
        <Grid divided='vertically' centered>
          <Grid.Row columns={3} >
            {/*Profile Column!*/}
            <Grid.Column width="3" verticalAlign="left" color="white" key="white">
              <Container className="dashPanel" >
                <div className="title">
                  <h1>{name}</h1>
                </div>
                <Profile />
              </Container>
            </Grid.Column>

            {/*Statistics Column!*/}
            {/*Will be used to display any sort of userbased statistics*/}
            {/*Added react-google-charts for our chart needs*/}
            <Grid.Column>
              <Container>
                <div className="title">
                  <h1 centered>Your Progress</h1>
                </div>
                <Charts />
                <br/><br/>
                Calories burned for today (Calories burned/Calorie Goal)
                <Progress percent={Math.floor((caloriesburned/calculatedbmr)*100)} inverted color='orange' progress indicating />
                Meal completion (Meals eaten caloric value/Total meal calories)
                <Progress percent={Math.floor((totalcalories/totalcal)*100)} inverted color='orange' progress indicating />
              </Container>
            </Grid.Column>

            {/*Meal Plan Column!*/}
            <Grid.Column fluid stretched>
              <Container className="dashPanel" >
              <div className="title">
                <h1>Today's Meals</h1>
              </div>
                <Item.Group divided>
                  {/*Breakfast*/}
                  <Item>
                    <Item.Image size='tiny' src='images/bacon.jpg' />
                    <Item.Content>
                      <Item.Header>Breakfast:</Item.Header>
                      <Item.Description>
                        <Item.Description>
                        {/*Ingredients Modal*/}
                        <Modal trigger=
                          {<Button size='huge' color='orange' fluid animated='fade'>
                            <Button.Content visible>
                              {meal1.name}
                            </Button.Content>
                            <Button.Content hidden>
                              Details
                            </Button.Content>
                          </Button>} closeIcon>
                          <Header icon='archive' content='Ingredients' />
                          <Modal.Content>
                            <div className="title">
                              <h1>{meal1.name} contains:</h1><br/>
                            </div>
                            <p>{meal1.Ingredients}</p>
                          </Modal.Content>
                          <Modal.Actions>
                                <Button color='green' onClick={this.breakfastadd}>
                                  <Icon name='checkmark' /> I have eaten this!
                                </Button>
                                <Button color='red' onClick={this.breakfastdel}>
                                  <Icon name='ban' /> I have NOT eaten this yet.
                                </Button>
                              </Modal.Actions>
                        </Modal>
                      </Item.Description>
                      </Item.Description>
                      <Item.Extra>
                      </Item.Extra>
                    </Item.Content>
                  </Item>

                  <Item>
                    {/*Lunch*/}
                    <Item.Image size='tiny' src='images/bacon.jpg' />
                    <Item.Content>
                      <Item.Header>Lunch:</Item.Header>
                      <Item.Description>
                        {/*Ingredients Modal*/}
                        <Modal trigger=
                          {<Button size='huge' color='orange' fluid animated='fade'>
                            <Button.Content visible>
                              {meal2.name}
                            </Button.Content>
                            <Button.Content hidden>
                              Details
                            </Button.Content>
                          </Button>} closeIcon>
                          <Header icon='archive' content='Ingredients' />
                          <Modal.Content>
                            <div className="title">
                              <h1>{meal2.name} contains:</h1><br/>
                            </div>
                            <p>{meal2.Ingredients}</p>
                          </Modal.Content>
                          <Modal.Actions>
                                <Button color='green' onClick={this.lunchadd}>
                                  <Icon name='checkmark' /> I have eaten this!
                                </Button>
                                <Button color='red' onClick={this.lunchdel}>
                                  <Icon name='ban' /> I have NOT eaten this yet.
                                </Button>
                              </Modal.Actions>
                        </Modal>
                      </Item.Description>
                      <Item.Extra>
                      </Item.Extra>
                    </Item.Content>
                  </Item>

                  <Item>
                    {/*Dinner*/}
                    <Item.Image size='tiny' src='images/bacon.jpg' />
                    <Item.Content>
                      <Item.Header>Dinner:</Item.Header>
                      <Item.Description>
                        <Item.Description>
                      {/*Ingredients Modal*/}
                        <Modal trigger=
                          {<Button size='huge' color='orange' fluid animated='fade'>
                            <Button.Content visible>
                              {meal3.name}
                            </Button.Content>
                            <Button.Content hidden>
                              Details
                            </Button.Content>
                          </Button>} closeIcon>
                          <Header icon='archive' content='Ingredients' />
                          <Modal.Content>
                            <div className="title">
                              <h1>{meal3.name} contains:</h1><br/>
                            </div>
                            <p>{meal3.Ingredients}</p>
                          </Modal.Content>
                              <Modal.Actions>
                                <Button color='green' onClick={this.dinneradd}>
                                  <Icon name='checkmark' /> I have eaten this!
                                </Button>
                                <Button color='red' onClick={this.dinnerdel}>
                                  <Icon name='ban' /> I have NOT eaten this yet.
                                </Button>
                              </Modal.Actions>
                        </Modal>
                      </Item.Description>
                      </Item.Description>
                      <Item.Extra>
                        
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
                {/* You can set currentcalories in the database to see progress bar. */}
                Calories currently consumed: {totalcalories}
                <br/> 
                This meal plans total calories are: {totalcal} 
                <br/>
                Current calorie goal: {calculatedbmr}     
              </Container>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}



ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));