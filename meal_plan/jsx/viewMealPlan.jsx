import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Card, Icon, Image, Grid, Segment, Button } from 'semantic-ui-react'
import NavBar from './navBar.jsx';
import axios from 'axios';

var calories;
var mealcalories;

axios({
  method: 'post',
  url: '/generateMealPlan/generate',
}).then(function (response) {
  console.log(response);
  calories = response.data.calories;
  mealcalories = response.data.breakfast.name;
  console.log(response.data.breakfast.name);
  console.log(response.data.lunch.name);
  console.log(response.data.dinner.name);
  return response;
}).catch(function (error) {
  console.log(error);
});

// not sure exactly how to use axios properly to display
// but a response is recieved with required data...



const View = () => (

  <Container fluid>
    <NavBar></NavBar>
    <Grid divided='vertically' centered>
      <Grid.Row columns={3} >
        <Grid.Column>
          <Container className="dashPanel" >
            lkjba
            <div>
              <span className="calories"></span>
            </div>

            {mealcalories}

          </Container>

        </Grid.Column>

        <Grid.Column>
          <Container className="dashPanel" >
          </Container>
        </Grid.Column>

        <Grid.Column>
          <Container className="dashPanel" >
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
          </Container>
        </Grid.Column>

      </Grid.Row>
    </Grid>
  </Container>

)


ReactDOM.render(<View />, document.getElementById('dashboard'));
