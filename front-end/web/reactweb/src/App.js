import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from './components/Button';
import * as service from './services/posts';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: 0,
      title: '',
    };
  }

  onIncrement = (event) => {
    this.fetchUserInfo(this.state.id + 1);
  }

  onDecrement = (event) => {
    this.fetchUserInfo(this.state.id - 1);
  }

  fetchUserInfo = async (id) => {
    const info = await Promise.all([
      service.getTitle(id)
    ]);
    this.setState(prevState => ({
      id: id,
      title: info[0].data.title
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h1>{this.state.title}</h1>
            <p>{this.state.content}</p>
            <Button onIncrement={this.onIncrement} onDecrement={this.onDecrement} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
