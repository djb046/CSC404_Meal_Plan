
import React from 'react';
import ReactDOM from 'react-dom';
// import {Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import { Container, Grid, Card, Icon, Image, Menu, Progress } from 'semantic-ui-react';
import Profile from './profile.jsx';


class NavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }


  render() {

    return (
        <Menu inverted>
          <Menu.Item name='home' href="/dashboard" />
          <Menu.Item name='messages' />
          <Menu.Item name='friends' />
          <Menu.Menu position='right'>
          <Menu.Item name='logout' href='logout'/>
          </Menu.Menu>
        </Menu>
    );
  }
}



export default NavBar;