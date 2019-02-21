import React from 'react'

class ChatDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.props.socket.on('broadcast', (message) => {
      this.setState({
        messages: [...this.state.messages, message]
      })
    })
  }

  render() {
    const messages = this.state.messages.map((message, idx) => {
      const messageColor = `message-color-${message.playerNumber}`
      return (
        <div key={idx} className='chat-message'>[{message.time}]<span className={messageColor}>{message.username}:</span> {message.message}</div>
      )
    })

    return (
      <div id='chat-display'>
        {messages}
      </div>
    )
  }
}

export default ChatDisplay
