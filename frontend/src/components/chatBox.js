import React from 'react'
import { connect } from 'react-redux'

import ChatDisplay from './chatDisplay'

class ChatBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ""
    }
  }

  updateMessage(value) {
    this.setState({message: value})
  }

  sumbitChat(e) {
    e.preventDefault()
    const time = new Date().toLocaleTimeString('en-US')
    const messageDetails = {
      message: this.state.message,
      time: time,
      username: this.props.user.username,
      playerNumber: this.props.user.playerNumber,
      gameId: this.props.gameId
    }
    this.props.socket.emit('sendMessage', messageDetails)
    this.setState({message: ""})
  }

  render() {
    return (
      <div id='chatbox'>
        <ChatDisplay socket={this.props.socket}/>
        <form id='chat-form' onSubmit={(e) => this.sumbitChat(e)}>
          <input type='text' id='chat-input' autocomplete="off" onChange={(e) => this.updateMessage(e.target.value)} value={this.state.message} />
          <input type='submit' id='submit-chat' value='SEND' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gameId: state.gameConfig.gameId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBox)
