import React from 'react'
import { connect } from 'react-redux'
import ChatBox from './chatBox'
import Board from './board'

import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8000')

class Lobby extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      progress: "NOT_STARTED"
    }
  }

  componentWillMount() {
    socket.emit('join', this.props.gameId)
  }

  determineView() {
    switch(this.state.progress) {
      case "NOT_STARTED":
        return (
            <div id='lobby-password prompt'>
              <div>Send your pals the lobby password:</div>
              <div id='lobby-password'>{this.props.gameId}</div>
            </div>
        )
        break
      case "STARTED":
        return (
          <Board />
        )
      case "FINISHED":
        //remove remove token
        break
      default:
        break
    }
  }

  render() {
    const view = this.determineView()
    return (
      <div id='lobby-container'>
        {view}
        <ChatBox socket={socket} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gameId: state.gameConfig.gameId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
