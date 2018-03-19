import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Link } from 'react-router-dom'


import route from './route';


ReactDOM.render(<Router routes={route} />, document.getElementById('root'));

