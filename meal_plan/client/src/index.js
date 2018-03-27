import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'

import App from './App';
import Survey from './Survey';
import Login from './login';


// hunter import the components and put them hoes in hur like the one that renders the App
ReactDOM.render(<BrowserRouter >

    <div>
        <Route path='/' component={App} />
        <Route path='/Survey' component={Survey}/>
        <Route path='/Login' component={Login}/>
    </div>

</BrowserRouter>, document.getElementById('root'));

