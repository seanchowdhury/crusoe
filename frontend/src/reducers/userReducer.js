import { RECEIVE_CURRENT_USER } from '../actions/userActions';

const UserReducer = (state = null, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { username: action.username, userId: action.userId, playerNumber: action.playerNumber }
      break
    default:
      return state
  }
};

export default UserReducer
