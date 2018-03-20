import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

import './App.css';
import { example } from './example';

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
        <span>yayayayayaya</span>
      </div>
    );
  }
}

export default App;