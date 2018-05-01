import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Grid, Card, Icon, Image, Menu, Progress, Item, Modal, Button, Header } from 'semantic-ui-react';
	

class Login extends React.Component {
  render() {

  return (
  <div>
      <br>
      </br>
      <br>
      </br>
      <div align="center">
      <h1>Smart Meal Plan</h1>
      <br>
      </br>
      <br>
      </br>
 
    <Container className="dashPanel4">
      <div  align="center">
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
	      </br>
      <br>
      </br>
      <Container className="dashPanel3">
      <br>
        </br>
        <br>
        </br>
     
        <h2>Welcome! Please log in.</h2>
        <br>
        </br>

        <a href="/auth/amazon">  <img border="0" alt="Login with Amazon" src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png" width="156" height="32" /></a> 
        </Container>
      </div>
       </Container>
       </div>
       </div>
       )
  }
}

ReactDOM.render(<Login />, document.getElementById('dashboard'));
