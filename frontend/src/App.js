import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './stylesheets/App.css';

import { authorize } from './actions/userActions'

import Lobby from './components/lobby'
import NewGame from './components/newGame'

class App extends Component {
  componentDidMount() {
    this.props.authorize()
  }

  render() {
    const view = this.props.inGame ? <Lobby /> : <NewGame />
    return (
      <div className="App">
        {view}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inGame: state.user ? true : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authorize: () => dispatch(authorize())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
