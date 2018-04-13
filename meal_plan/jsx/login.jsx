import BackgroundSlideshow from 'react-background-slideshow'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class Login extends React.Component {

  render() {
    return (
      <div>
        <h2>Welcome! Please log in.</h2>
  
        <a href="/auth/amazon">  <img border="0" alt="Login with Amazon" src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png" width="156" height="32" /></a>
        
        {/* <BackgroundSlideshow images={[mater, picnic, rav, tater]} /> */}
      </div>
    )
  }
}

ReactDOM.render(<Login />, document.getElementById('login'));