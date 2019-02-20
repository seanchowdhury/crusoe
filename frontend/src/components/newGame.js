import React from 'react'
import { connect } from 'react-redux'

class NewGame {
  constructor(props) {
    super(props)

    this.state = {
      username: ""
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.createGame(user);
  }

  render() {
    return (
      <form id='new-game-form' onSubmit={(e) => this.handleSubmit(e)}>
        <input type='text'
          value={this.state.username}
          onChange={this.update('username')}
          placeholder='username'
          className='new-game-input' />
        <input type='submit' id='submit-new-game' value='Start New Game' />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    processForm: user => dispatch(createGame(user))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGame);
