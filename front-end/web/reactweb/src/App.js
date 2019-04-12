import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Link to="/">홈</Link>
            <Link to="/movie">Movie</Link>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
