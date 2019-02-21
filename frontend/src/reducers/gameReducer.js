import { RECEIVE_GAME_CONFIG } from '../actions/gameActions';

const GameConfigReducer = (state = null, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_GAME_CONFIG:
      return { gameId: action.gameId }
      break
    default:
      return state
  }
};

export default GameConfigReducer
