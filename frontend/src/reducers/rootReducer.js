import { combineReducers } from 'redux'
import UserReducer from './userReducer'
import GameConfigReducer from './gameReducer'

const rootReducers = combineReducers({
  user: UserReducer,
  gameConfig: GameConfigReducer
});

export default rootReducers
