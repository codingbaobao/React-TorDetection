import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom'
const App = (props) => (
    <div className="App">
        <header className="App-header">
          <Link to ='/home'>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h1 className="App-title">Welcome to React</h1>
        </header>
    </div>
);

export default App;
