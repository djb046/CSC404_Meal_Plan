import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

import './App.css';
import { example } from './example';
import Survey from './Survey';

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
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
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
  				<li><Link to='/example'>Shopping List</Link></li>
  			</ul>
		</span>
      </div>
    );
  }
}

export default App;