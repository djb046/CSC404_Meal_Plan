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
      meal3: ""
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
  meal3: response.data.dinner
});
});
}

  render() {
    const meal1 = this.state.meal1;
    const meal2 = this.state.meal2;
    const meal3 = this.state.meal3;
    return (
      <Container fluid>
        <NavBar></NavBar>
        <Grid divided='vertically' centered>
          <Grid.Row columns={3} >
            {/*Profile Column!*/}
            <Grid.Column width="3" verticalAlign="left" color="white" key="white">
              <Container className="dashPanel" >
                <div className="title">
                  <h1>Cardinal Copia</h1>
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
                <Progress percent={75} inverted color='orange' progress />
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
                                <Button color='green'>
                                  <Icon name='checkmark' /> I have eaten this!
                                </Button>
                                <Button color='red'>
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
                                <Button color='green'>
                                  <Icon name='checkmark' /> I have eaten this!
                                </Button>
                                <Button color='red'>
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
                                <Button color='green'>
                                  <Icon name='checkmark' /> I have eaten this!
                                </Button>
                                <Button color='red'>
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
              </Container>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}



ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));