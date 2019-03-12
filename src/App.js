import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import logo from './logo.svg';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 0
    }
    const socket = openSocket('https://socket-server-app-test.herokuapp.com/', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });
    socket.on('connect', () => {
      socket.emit('subscribeToTimer', 1000);
      socket.on('timer', timestamp => this.setState({
        timestamp
      }));
    });
    socket.on('disconnect', () => {
      alert('Your socket is disconnect');
    });
  }


  render() {
    const { timestamp } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. {timestamp}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
