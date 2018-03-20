import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'

import ShoppingList from './example';
import App from './App';


// hunter import the components and put them hoes in hur like the one that renders the App
ReactDOM.render(<BrowserRouter >

    <div>
        <Route path='/' component={App} />
        <Route path='/yaya' component={ShoppingList}/>
    </div>

</BrowserRouter>, document.getElementById('root'));

