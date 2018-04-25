import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Grid, Card, Icon, Image, Menu, Progress } from 'semantic-ui-react';
import Profile from './profile.jsx';
import NavBar from './navBar.jsx';
import axios from 'axios';


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
            <Grid.Column>
              <Container className="dashPanel" >
                <Profile />
              </Container>

            </Grid.Column>

            <Grid.Column>
              <Container className="" >
                <Progress percent={85} inverted color='blue' progress />
              </Container>
            </Grid.Column>

            <Grid.Column>
              <Container className="dashPanel" >
              Breakfast: 
                {meal1.name}
                <br />
                <br />
                Lunch: 
                {meal2.name}
                <br />
                <br />
                Dinner: 
                {meal3.name}
                </Container>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}



ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));