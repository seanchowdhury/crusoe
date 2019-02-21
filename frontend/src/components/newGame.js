import React from 'react'
import { connect } from 'react-redux'
import { createGame, joinGame } from '../actions/gameActions'

class NewGame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      createUsername: "",
      joinUsername: "",
      passcode: ""
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleNewGame(e) {
    e.preventDefault()
    this.props.createGame(this.state.createUsername)
  }

  handleJoinGame(e) {
    e.preventDefault()
    this.props.joinGame(this.state.joinUsername, this.state.passcode)
  }

  render() {
    return (
      <div id='new-game-container'>
        <form className='new-game-form' onSubmit={(e) => this.handleNewGame(e)}>
          <input type='text'
            value={this.state.createUsername}
            onChange={this.update('createUsername')}
            placeholder='username'
            className='new-game-input' />
          <input type='submit' className='submit-new-game' value='Start New Game' />
        </form>
        <form className='new-game-form' onSubmit={(e) => this.handleJoinGame(e)}>
          <input type='text'
            value={this.state.joinUsername}
            onChange={this.update('joinUsername')}
            placeholder='username'
            className='new-game-input' />
            <input type='text'
              value={this.state.passcode}
              onChange={this.update('passcode')}
              placeholder='passcode'
              className='new-game-input' />
          <input type='submit' className='submit-new-game' value='Join Game' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGame: username => dispatch(createGame(username)),
    joinGame: (username, passcode) => dispatch(joinGame(username, passcode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGame)
