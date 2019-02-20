import React from 'react'
import ChatDisplay from './chatDisplay';

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
    this.props.socket.emit('sendMessage', this.state.message)
    this.setState({message: ""})
  }

  render() {
    return (
      <div id='chatbox'>
        <ChatDisplay socket={this.props.socket}/>
        <form id='chat-form' onSubmit={(e) => this.sumbitChat(e)}>
          <input type='text' id='chat-input' onChange={(e) => this.updateMessage(e.target.value)} value={this.state.message} />
          <input type='submit' id='submit-chat' value='SEND' />
        </form>
      </div>
    )
  }
}

export default ChatBox;
