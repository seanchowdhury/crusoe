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
    console.log(this.state.messages)
    const messages = this.state.messages.map((message, idx) => {
      return (
        <div key={idx} className='chat-message'>{message}</div>
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
