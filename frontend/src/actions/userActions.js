import Cookie from 'js-cookie';
import history from '../history';

import { receiveGameConfig } from './gameActions'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = ({ username, userId, playerNumber }) => (
  {
    type: RECEIVE_CURRENT_USER,
    username: username,
    userId: userId,
    playerNumber: playerNumber
  }
)

export const authorize = () => dispatch => {
  const token = Cookie.get('access-token')
  if(token) {
    fetch('/users/authorize', {
      method: 'POST',
      body: JSON.stringify({
        token: token
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => {
        return res.json()
    })
    .then(json => {
      if (json.token) {
        dispatch(receiveGameConfig(json.gameConfig))
        dispatch(receiveCurrentUser(json.user))
        history.push(`/${json.gameConfig.gameId}`)
      } else {
        Cookie.remove('access-token')
        history.push('/')
      }
    })
  } else {
    history.push('/')
  }
}
