import Cookie from 'js-cookie';
import history from '../history';
import { receiveCurrentUser } from './userActions'

export const RECEIVE_GAME_CONFIG = 'RECEIVE_GAME_CONFIG'

export const receiveGameConfig = ({ gameId }) => (
  {
    type: RECEIVE_GAME_CONFIG,
    gameId: gameId
  }
)

export const createGame = username => dispatch => {
  return fetch('game/createGame', {
    method: 'POST',
    body: JSON.stringify({
      username: username
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(json => {
    Cookie.set('access-token', json.token)
    dispatch(receiveGameConfig(json.gameConfig))
    dispatch(receiveCurrentUser(json.user))
    history.push(`/${json.gameConfig.gameId}`)
  })
}

export const joinGame = (username, passcode) => dispatch => {
  return fetch('game/joinGame', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      passcode: passcode
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(json => {
    Cookie.set('access-token', json.token)
    dispatch(receiveGameConfig(json.gameConfig))
    dispatch(receiveCurrentUser(json.user))
    history.push(`/${json.gameConfig.gameId}`)
  })
}
