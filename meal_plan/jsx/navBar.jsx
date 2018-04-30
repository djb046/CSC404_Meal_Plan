
import React from 'react';
import ReactDOM from 'react-dom';
// import {Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import { Container, Grid, Card, Icon, Image, Menu, Progress, Dropdown } from 'semantic-ui-react';
import Profile from './profile.jsx';


class NavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }


  render() {

    return (
        <Menu color="green" inverted>
          <Menu.Item name='home' href="/dashboard" />
          <Dropdown item text='Meal Plan'>
          <Dropdown.Menu>
            <Dropdown.Item href="/viewMealPlan">View</Dropdown.Item>
            <Dropdown.Item href='/createMealPlan'>Generate</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          <Menu.Item name='Profile' href='/profile'/>
          <Menu.Menu position='right'>
          <Menu.Item name='logout' href='logout'/>
          </Menu.Menu>
        </Menu>
    );
  }
}



export default NavBar;