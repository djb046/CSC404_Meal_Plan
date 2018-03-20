import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

import './App.css';



class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
  };


  
  render() {
    return (
      <div>
      	<span >
      		<ul>
      			<li><Link to='/'>Home</Link></li>
      			<br/>
  				<li><Link to='/Survey'>User Details Survey</Link></li>
  				<br/>
          <li><Link to='/Login'>Login</Link></li>
  			</ul>
		</span>
      </div>
    );
  }
}

export default App;