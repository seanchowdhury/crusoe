import React, { Component } from 'react';
import './stylesheets/App.css';

import ChatBox from './components/chatBox'

import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8000')

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatBox socket={socket}/>
      </div>
    );
  }
}

export default App;
